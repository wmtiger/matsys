import ax from '@/common/ax2'

export function login (nickName, password) {
  return ax({
    method: 'post',
    data: { action: 10, data: { strValues: [nickName, password] } }
  })
}

export function modifyPwd (oldPwd, newPwd) {
  return ax({
    method: 'post',
    data: {action: 1022, strValues: [oldPwd, newPwd]}
  })
}
