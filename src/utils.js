
/**
 * 判断`value`是非数组或者空数组
 *
 * @export
 * @param {T[]} value
 * @returns
 */
export function isNotOrEmptyArray(value) {
  return !Array.isArray(value) || !value.length;
}
