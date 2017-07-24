import ax from '../common/ax'

export function login (nickName, password) {
  return ax({
    method: 'post',
    data: {action: 10, strValues: [nickName, password]}
  })
  // ax({
  //   method: 'post',
  //   data: {action: 10, strValues: [nickName, password]}
  // }).then(resp => {
  //   console.log('resp', resp)
  //   if (resp.data && resp.data.phase === 2) {
  //   }
  // }).catch(err => {
  //   console.log('err', err)
  // })
}

export function modifyPwd (oldPwd, newPwd) {
  ax({
    method: 'post',
    data: {action: 1022, strValues: [oldPwd, newPwd]}
  }).then(resp => {
    console.log(resp)
  }).catch(err => {
    console.log(err)
  })
}
