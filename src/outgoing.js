import {sanitizeUserId} from './utils'
const handlePromise = (next, promise) => {
  return promise
    .then(res => {
      console.log('success')
      console.log(res)
      next()
      return res
    })
    .catch(err => {
      console.log('error')
      console.log(err)
      next(err)
      throw err
    })
}

const handleText = (event, next, zalo) => {
  return handlePromise(
    next,
    zalo.getClient().api('sendmessage/text', 'POST', {uid: sanitizeUserId(event.raw.userId), message: event.text})
  )
}

module.exports = {
  text: handleText
}
