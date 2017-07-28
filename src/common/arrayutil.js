/** 从列表中获取对应key相同value的item对象 */
export function getListItemByKey (list, key, value) {
  let len = list.length
  for (let i = 0; i < len; i++) {
    let item = list[i]
    // console.log(key, value, item)
    if (item[key] === value) {
      return item
    }
  }
  return null
}
