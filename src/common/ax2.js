import axios from 'axios'
import dcodeIO from 'dcodeIO'
import store from '../store'

if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
  throw (new Error('ProtoBuf.js is not present. Please see www/index.html for manual setup instructions.'))
}

let ProtoBuf = dcodeIO.ProtoBuf
let proto = ProtoBuf.loadProtoFile('../../static/protos/MessageVO.proto')
let MessageVO = proto.build('com.gameabc.bfc.model.bto.MessageVO')
let ParamVO = proto.build('com.gameabc.bfc.model.bto.ParamVO')

function initData (obj) {
  var msg = new MessageVO()
  msg.phase = 1
  msg.action = obj.action
  var dat = new ParamVO()
  if (obj.data) {
    dat.strValues = obj.data.strValues ? obj.data.strValues : []
    dat.intValues = obj.data.intValues ? obj.data.intValues : []
    dat.longValues = obj.data.longValues ? obj.data.longValues : []
    dat.data = obj.data.data ? obj.data.data : []
  }
  msg.data = dat
  msg.token = store.getters.token
  msg.clientNumId = store.getters.clientNumId
  return msg
}

var AX = axios.create({
  baseURL: process.env.BASE_API,
  url: '',
  timeout: 10000,
  method: 'post',
  responseType: 'arraybuffer',
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    let msg = initData(data)
    console.log('ax send msg', msg)
    // 这里是自定的数据发送格式 [Uint8Array]
    let body = msg.toBuffer()
    let len = body.byteLength
    let dv = new DataView(new ArrayBuffer(len + 4))
    let bodyDv = new DataView(body)
    dv.setInt32(0, len, false)
    for (let i = 0; i < len; i++) {
      dv.setUint8(i + 4, bodyDv.getUint8(i))
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
    console.log('ax resp msg', dd)
    return dd
  }]
})

// respone拦截器
AX.interceptors.response.use(
  response => {
    const res = response.data
    if (res.phase !== 2) {
      store.dispatch('FedLogOut').then(() => {
        // 为了重新实例化vue-router对象 避免bug
        this.$router.push('/')
      })
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default AX
