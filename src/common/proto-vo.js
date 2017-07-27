import dcodeIO from 'dcodeIO'

if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
  throw (new Error('ProtoBuf.js is not present. Please see www/index.html for manual setup instructions.'))
}

let ProtoBuf = dcodeIO.ProtoBuf
// let proto = ProtoBuf.loadProtoFile('../../static/protos/MessageVO.proto')
// let MessageVO = proto.build('com.gameabc.bfc.model.bto.MessageVO')
// let ParamVO = proto.build('com.gameabc.bfc.model.bto.ParamVO')

let VOKEY = {
  'MessageVO': 'com.gameabc.bfc.model.bto.MessageVO',
  'ParamVO': 'com.gameabc.bfc.model.bto.ParamVO',
  'MenuVO': 'com.gameabc.bfc.model.bto.manager.MenuVO'
}

let vo = {
}

/** 这里的voName必须和proto的名字相同 */
function createVO (voName) {
  let proto = ProtoBuf.loadProtoFile('../../static/protos/' + voName + '.proto')
  vo[voName] = proto.build(VOKEY[voName])
}

export function getVO (voName) {
  if (!vo[voName]) {
    console.log('have not', voName)
    createVO(voName)
  }
  console.log('have', voName)
  return vo[voName]
}
