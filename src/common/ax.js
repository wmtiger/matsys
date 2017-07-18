import axios from 'axios'
import pbjs from 'protobufjs'

let proto = pbjs.loadSync('../protos/MessageVO.proto')
let MessageVO = proto.build('com.gameabc.bfc.model.bto.MessageVO')
let ParamVO = proto.build('com.gameabc.bfc.model.bto.ParamVO')

const AX = axios.create({
  baseURL: 'http://192.168.138.136:9095/',
  url: '',
  timeout: 3000,
  method: 'post',
  responseType: 'arraybuffer',
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    console.log(data)
    let msg = new MessageVO()
    msg.phase = 1
    msg.action = data.action
    let param = new ParamVO()
    param.strValues = data.strValues
    param.intValues = data.intValues
    param.longValues = data.longValues
    param.data = data.data
    msg.data = param

    // 这里是自定的数据发送格式
    let body = msg.toBuffer()
    let len = body.byteLength
    let dv = new DataView(new ArrayBuffer(len + 4))
    let bodyDv = new DataView(body)
    dv.setInt32(0, len, false)
    for (let i = 0; i < len; i++) {
      dv.setUint8(i + 4, bodyDv.getUint8(i))
    }
    return dv.buffer
  }],
  transformResponse: [data => {
    // 对 data 进行任意转换处理
    console.log(data)
    let dv = new DataView(data)
    let len = dv.getInt32(0, false)
    let bodyDv = new DataView(new ArrayBuffer(len))
    for (let i = 0; i < len; i++) {
      bodyDv.setUint8(i, dv.getUint8(i + 4))
    }
    return MessageVO.decode(bodyDv.buffer)
  }]
})

export default AX
