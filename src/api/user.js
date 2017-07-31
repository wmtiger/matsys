import ax from '@/common/ax2'
import ACTION from './actions'

export function login (nickName, password) {
  return ax({
    method: 'post',
    data: { action: ACTION.LOGIN, data: { strValues: [nickName, password] } }
  })
}

export function modifyPwd (oldPwd, newPwd) {
  return ax({
    method: 'post',
    data: {action: 1022, strValues: [oldPwd, newPwd]}
  })
}

export function getAllUser () {
  return ax({
    method: 'post',
    data: {action: ACTION.CMP_MANAGER_GETS}
  })
}
