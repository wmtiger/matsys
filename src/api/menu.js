import ax from '../common/ax'

export function getMyMenu (uid) {
  ax({
    method: 'post',
    data: {action: 1156, longValues: [uid]}
  }).then(resp => {
    console.log('getMyMenu resp', resp)
  }).catch(err => {
    console.log('getMyMenu err', err)
  })
}
