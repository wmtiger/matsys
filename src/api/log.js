import ax from '../common/ax2'

export function getLog () {
  return ax({
    method: 'post',
    data: {action: 1101}
  })
}
