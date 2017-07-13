import axios from 'axios'
import md5 from 'md5'

let host = 'http://test.51zhaolian.com:8088'
let key = 'wech_app2015_en'

/** 用户注册（第一步：发送 验证码） */
function getVerifyCode (cellphone) {
  // 加密字段,加密方法（Key+cellphone+timeStamp 顺序进行MD5加密，Key的值为wech_app2015_en）
  let time = new Date().getTime()
  let sign = md5(key + cellphone + time)
  var obj = {
    cellphone: cellphone,
    timeStamp: time,
    summary: sign
  }
  axios.post(host + '/wechapi/member/getVerifyCode', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

/** 用户注册 */
function regist(cellphone, pwd, invCode, verifyCode, deviceId,
  sex, age, nickName, skillIds, type, openId) {
  let time = new Date().getTime()
  let sign = md5(key + cellphone + time)
  var obj = {
    cellphone: cellphone,
    password: pwd,
    timeStamp: time,
    summary: sign,
    invCode: invCode,
    verifyCode: verifyCode,
    deviceId: deviceId,
    sex: sex,
    age: age,
    nickName: nickName,
    skillIds: skillIds,
    type: type,
    openId: openId
  }
  axios.post(host + '/wechapi/member/regist', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

/** 用户登陆 */
function login (cellphone, pwd) {
  let time = new Date().getTime()
  let sign = md5(key + cellphone + time)
  var obj = {
    cellphone: cellphone,
    password: pwd,
    timeStamp: time,
    summary: sign
  }
  axios.post(host + '/wechapi/member/login', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

/** 找回密码 */
function changepassword (cellphone, pwd, verifyCode) {
  let time = new Date().getTime()
  let sign = md5(key + cellphone + time)
  var obj = {
    cellphone: cellphone,
    password: pwd,
    verifyCode: verifyCode,
    timeStamp: time,
    summary: sign
  }
  axios.post(host + '/wechapi/member/changepassword', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

/** 检查验证码正确性 */
function checkVerifyCode (cellphone, verifyCode) {
  let time = new Date().getTime()
  let sign = md5(key + cellphone + time)
  var obj = {
    cellphone: cellphone,
    verifyCode: verifyCode,
    timeStamp: time,
    summary: sign
  }
  axios.post(host + '/wechapi/member/checkVerifyCode', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

function changePass (credential, pwd, newPwd) {
  let sign = md5(key + credential)
  var obj = {
    credential: credential,
    password: pwd,
    newPassword: newPwd,
    summary: sign
  }
  axios.post(host + '/wechapi/member/changePass', obj)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}
