import axios from 'axios'
import dcodeIO from 'dcodeIO'
// console.log(dcodeIO)
if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
  throw (new Error('ProtoBuf.js is not present. Please see www/index.html for manual setup instructions.'))
}

let ProtoBuf = dcodeIO.ProtoBuf
let proto = ProtoBuf.loadProtoFile('../../static/protos/MessageVO.proto')
let MessageVO = proto.build('com.gameabc.bfc.model.bto.MessageVO')
let ParamVO = proto.build('com.gameabc.bfc.model.bto.ParamVO')

/**
function initData (data) {
  var msg = new MessageVO()
  msg.phase = 1
  msg.action = 10
  var dat = new ParamVO()
  dat.strValues = ['jx', 'jx']
  // dat.strValues = data.strValues ? data.strValues : []
  dat.intValues = data.intValues ? data.intValues : []
  dat.longValues = data.longValues ? data.longValues : []
  dat.data = data.data ? data.data : []
  msg.data = dat
  // msg.token = ''
  return msg
} */

var AX = axios.create({
  baseURL: 'http://192.168.138.136:9095/',
  url: '',
  timeout: 3000,
  method: 'post',
  responseType: 'arraybuffer',
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    let msg = new MessageVO()
    msg.phase = 1
    msg.action = 10
    let par = new ParamVO()
    par.strValues = ['jx', 'jx']
    msg.data = par

    // let msg = initData(data)
    console.log(msg)
    // 这里是自定的数据发送格式 [Uint8Array]
    let body = msg.toBuffer()
    let len = body.byteLength
    console.log(len, body)
    let dv = new DataView(new ArrayBuffer(len + 4))
    let bodyDv = new DataView(body)
    dv.setInt32(0, len, false)
    for (let i = 0; i < len; i++) {
      let tt = bodyDv.getUint8(i)
      dv.setUint8(i + 4, tt)
    }
    return dv
  }],
  transformResponse: [data => {
    // 对 data 进行任意转换处理
    let dv = new DataView(data)
    let len = dv.getInt32(0, false)
    let bodyDv = new DataView(new ArrayBuffer(len))
    for (let i = 0; i < len; i++) {
      bodyDv.setUint8(i, dv.getUint8(i + 4))
    }
    let dd = MessageVO.decode(bodyDv.buffer)
    console.log('dd2', dd)
    return dd
  }]
})

export default AX
