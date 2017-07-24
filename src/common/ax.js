import axios from 'axios'
import pbjs from 'protobufjs'

var MessageVO
pbjs.load('../../static/protos/MessageVO.proto', (err, root) => {
  if (err) throw err
  MessageVO = root.lookupType('com.gameabc.bfc.model.bto.MessageVO')
})

let a = pbjs.util.LongBits.fromNumber(222222222222222)
console.log('aaaaa', a)
console.log('a', a)
console.log('aa', a.toNumber())

const AX = axios.create({
  baseURL: 'http://192.168.138.136:9095/',
  url: '',
  timeout: 3000,
  method: 'post',
  responseType: 'arraybuffer',
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    let longs = []
    if (data.longValues) {
      let longLen = data.longValues.length
      for (var i = 0; i < longLen; i++) {
        longs[i] = pbjs.util.LongBits.fromNumber(data.longValues[i])
      }
    }
    let pm = {
      phase: 1,
      action: data.action,
      data: {
        strValues: data.strValues,
        intValues: data.intValues,
        longValues: longs,
        data: data.data
      }
    }
    let merrMsg = MessageVO.verify(pm)
    if (merrMsg) throw Error(merrMsg)

    // 这里是自定的数据发送格式 [Uint8Array]
    var body = MessageVO.encode(pm).finish()
    let len = body.byteLength
    let dv = new DataView(new ArrayBuffer(len + 4))
    dv.setInt32(0, len, false)
    for (let i = 0; i < len; i++) {
      dv.setUint8(i + 4, body[i])
    }
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
