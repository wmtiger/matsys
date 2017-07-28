import Cookies from 'js-cookie'

const TokenKey = 'SLOT-User-Token'
const UserNameKey = 'SLOT-User-Name'
const UserPwdKey = 'SLOT-User-Pwd'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {expires: 1800})
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setUserName (userName) {
  return Cookies.set(UserNameKey, userName, {expires: 1800})
}

export function getUserName () {
  return Cookies.get(UserNameKey)
}

export function removeUserName () {
  return Cookies.remove(UserNameKey)
}

export function setUserPwd (pwd) {
  return Cookies.set(UserPwdKey, pwd, {expires: 1800})
}

export function getUserPwd () {
  return Cookies.get(UserPwdKey)
}

export function removeUserPwd () {
  return Cookies.remove(UserPwdKey)
}
