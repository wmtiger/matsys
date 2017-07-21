import ax from '../common/ax'
// import pbjs from 'protobufjs'

export function login (nickName, password) {
  console.log(ax)
  ax({
    data: {action: 10, strValues: [nickName, password]}
  }).then(resp => {
    console.log(resp)
  }).catch(err => {
    console.log(err)
  })
}

export function modifyPwd (oldPwd, newPwd) {
  ax({
    data: {action: 1022, strValues: [oldPwd, newPwd]}
  }).then(resp => {
    console.log(resp)
  }).catch(err => {
    console.log(err)
  })
}
