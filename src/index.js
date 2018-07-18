/*
  Botpress module template. This is your module's entry point.
  Please have a look at the docs for more information about config, init and ready.
  https://botpress.io/docs
*/

import _ from 'lodash'
import outgoing from './outgoing'
import incoming from './incoming'
import UMM from './umm'
import Zalo from './zalo'
let zalo = null

const outgoingMiddleware = (event, next) => {
  if (event.platform !== 'zalo') {
    return next()
  }

  if (!outgoing[event.type]) {
    return next('Unsupported event type: ' + event.type)
  }

  return outgoing[event.type](event, next, zalo)
}

const initializeZalo = async (bp, configurator) => {
  const config = await configurator.loadAll()

  zalo = new Zalo(bp, config)
  // users = Users(bp, messenger)

  const enabled = config.enabled

  if (!enabled) {
    return bp.logger.warn('[Messenger] Connection disabled')
  }

  return zalo
  //   .connect()
  //   .then(() => messenger.updateSettings())
  //   .catch(err => bp.logger.error(err))
}

module.exports = {
  config: {
    oaID: { type: 'string', required: true, default: '', env: 'ZALO_OA_ID' },
    secretKey: { type: 'string', required: true, default: '', env: 'ZALO_SECRET_KEY' },
    enabled: { type: 'bool', required: true, default: true }
  },

  // eslint-disable-next-line no-unused-vars
  init: async (bp, configurator, helpers) => {
    bp.middlewares.register({
      name: 'zalo.sendMessages',
      type: 'outgoing',
      order: 101,
      handler: outgoingMiddleware,
      module: 'botpress-zalo',
      description:
        'Sends out messages that targets platform = zalo. This middleware should be placed at the end as it swallows events once sent.'
    })

    bp.zalo = {}

    UMM(bp) // Initializes Zalo in the UMM
  },

  // eslint-disable-next-line no-unused-vars
  ready: async (bp, configurator, helpers) => {
    // Your module's been loaded by Botpress.
    // Serve your APIs here, execute logic, etc.

    await initializeZalo(bp, configurator)
    incoming(bp, configurator, zalo)
    bp.zalo._internal = zalo
  }
}
