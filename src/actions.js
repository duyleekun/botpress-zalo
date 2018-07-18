import Promise from 'bluebird'
import _ from 'lodash'

const create = obj => {
  let resolve = null
  let reject = null
  const promise = new Promise((r, rj) => {
    resolve = r
    reject = rj
  })

  const messageId = new Date().toISOString() + Math.random()
  const newEvent = Object.assign(
    {
      // _promise: promise,
      // _resolve: resolve,
      // _reject: reject,
      __id: messageId
    },
    obj
  )

  return newEvent
}

export function createText(userId, text) {
  return create({
    platform: 'zalo',
    text,
    type: 'text',
    raw: {userId, text},
    user: {id: userId}
  })
}
