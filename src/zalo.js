import {ZaloOA} from 'zalo-sdk'
import EventEmitter from 'eventemitter2'
export default class Zalo extends EventEmitter {
  constructor(bp, config) {
    super()
    this.zOAClient = new ZaloOA({
      oaid: config.oaID,
      secretkey: config.secretKey
    });

    this.setConfig(config)
    this.bp = bp

    this.app = bp.getRouter('botpress-zalo', {
      'bodyParser.json': false,
      auth: req => !/\/webhook/i.test(req.originalUrl)
    })

    // this.app.use(
    //   bodyParser.json({
    //     verify: this._verifyRequestSignature.bind(this)
    //   })
    // )

    this._initWebhook()
  }

  getClient() {
    return this.zOAClient;
  }

  setConfig(config) {
    this.config = Object.assign({}, this.config, config)
  }
  getConfig() {
    return this.config
  }

  _initWebhook() {
    this.app.get('/webhook', (req, res) => {

      const {event, message, fromuid, msgid} = req.query;
      switch (event) {
        case 'sendmsg':
        this._handleEvent(event, {message, fromuid, msgid})
        break;
        default:

        break;
      }

      // Must send back a 200 within 20 seconds or the request will time out.
      res.sendStatus(200)
    })
  }

  _handleEvent(type, event) {
    this.emit(type, event)
  }
}
