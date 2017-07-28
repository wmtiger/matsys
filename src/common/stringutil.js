/** 去除空格, 建议用于短的字符串, 因为是循环处理的 */
export function trim (str) {
  for (var i = str.length - 1; i >= 0; i--) {
    if (str.charAt(i) === ' ') {
      str = str.substring(0, i) + str.substring(i + 1)
    }
  }
  return str
}
