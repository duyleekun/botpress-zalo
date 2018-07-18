import LRU from 'lru-cache'
import _ from 'lodash'
import outgoing from './outgoing'

module.exports = (bp, config, zalo) => {
  const messagesCache = LRU({
    max: 10000,
    maxAge: 60 * 60 * 1000
  })

  zalo.on('sendmsg', (e) => {
    const {message, fromuid} = e
    bp.middlewares.sendIncoming({
      platform: 'zalo',
      type: 'message',
      user: {id: `zalo:${fromuid}`},
      text: message,
      raw: e
    })
  })
}
