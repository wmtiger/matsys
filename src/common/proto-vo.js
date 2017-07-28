import dcodeIO from 'dcodeIO'

if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
  throw (new Error('ProtoBuf.js is not present. Please see www/index.html for manual setup instructions.'))
}

let ProtoBuf = dcodeIO.ProtoBuf

let vo = {
}

/** 这里的voName必须和proto的名字相同 */
function createVO (voName) {
  let proto = ProtoBuf.loadProtoFile('../../static/protos/' + voName + '.proto')
  vo[voName] = proto.build(voName)
}

export function getVO (voName) {
  if (!vo[voName]) {
    console.log('have not', voName)
    createVO(voName)
  }
  console.log('have', voName)
  return vo[voName]
}
