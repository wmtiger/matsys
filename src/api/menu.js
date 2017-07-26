import ax from '../common/ax2'

export function getMyMenu () {
  return ax({
    method: 'post',
    data: {action: 1156}
  })
}
