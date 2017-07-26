/** 这里用的是6.x.x的版本的protobufjs */
import axios from 'axios'
import pbjs from 'protobufjs'

var MessageVO
var ParamVO
pbjs.load('../../static/protos/MessageVO.proto', (err, root) => {
  if (err) throw err
  MessageVO = root.lookupType('com.gameabc.bfc.model.bto.MessageVO')
  ParamVO = root.lookupType('com.gameabc.bfc.model.bto.ParamVO')
})
function getReqData (obj) {
  var longs = []
  var strs = []
  var ints = []
  var datas = []
  if (obj.data && obj.data.longValues) {
    let longLen = obj.data.longValues.length
    for (var i = 0; i < longLen; i++) {
      longs[i] = pbjs.util.LongBits.fromNumber(obj.data.longValues[i]).toLong()
    }
  }
  if (obj.data && obj.data.strValues) {
    strs = obj.data.strValues
  }
  if (obj.data && obj.data.intValues) {
    ints = obj.data.intValues
  }
  if (obj.data && obj.data.data) {
    datas = obj.data.data
  }
  let par = {
    strValues: strs,
    intValues: ints,
    longValues: longs,
    data: datas
  }
  let pm = {
    phase: 1,
    action: obj.action,
    data: {
      
    },
    token: '',
    clientNumId: obj.clientNumId ? obj.clientNumId : ''
  }
  return pm
}
const AX = axios.create({
  baseURL: 'http://192.168.138.136:9095/',
  url: '',
  timeout: 3000,
  method: 'post',
  responseType: 'arraybuffer',
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    let pm = getReqData(data)
    console.log(pm)
    // let merrMsg = MessageVO.verify(pm)
    // if (merrMsg) throw Error(merrMsg)

    // 这里是自定的数据发送格式 [Uint8Array]
    var body = MessageVO.encode(pm).finish()
    let len = body.byteLength
    let dv = new DataView(new ArrayBuffer(len + 4))
    dv.setInt32(0, len, false)
    for (let i = 0; i < len; i++) {
      dv.setUint8(i + 4, body[i])
    }
    console.log(dv)
    return dv.buffer
  }],
  transformResponse: [data => {
    // 对 data 进行任意转换处理
    let dv = new DataView(data)
    let len = dv.getInt32(0, false)
    let bodyDv = new Uint8Array(new ArrayBuffer(len))
    for (let i = 0; i < len; i++) {
      bodyDv[i] = dv.getUint8(i + 4)
    }
    return MessageVO.decode(bodyDv)
  }]
})

export default AX
