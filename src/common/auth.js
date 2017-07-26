import Cookies from 'js-cookie'

const TokenKey = 'SLOT-User-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {expires: 1800})
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
