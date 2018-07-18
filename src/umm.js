import _ from 'lodash'
import {createText} from './actions'

function getUserId(event) {
  return event.user.id
}

function processOutgoing({ event, blocName, instruction }) {
  const ins = Object.assign({}, instruction) // Create a shallow copy of the instruction

  if (!_.isNil(instruction.text)) {
    return createText(getUserId(event), instruction.text)
  }

  const strRep = util.inspect(instruction, false, 1)
  throw new Error(`Unrecognized instruction on Zalo in bloc '${blocName}': ${strRep}`)
}


module.exports = bp => {
  const [renderers, registerConnector] = _.at(bp, ['renderers', 'renderers.registerConnector'])

  renderers &&
    registerConnector &&
    registerConnector({
      platform: 'zalo',
      processOutgoing: args => processOutgoing(Object.assign({}, args, { bp })),
      templates: []
    })
}
