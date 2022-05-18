// https://github.com/microsoft/TypeScript/issues/37663
type MetValue<T> = T extends Function ? never : T | (() => T);

/**
 * 根据判断条件，执行函数或返回
 * @param condition 判断条件
 * @param metValue 为 true 返回（值或函数的返回值）
 * @param unmetValue 不满足返回
 */
export default function when<T = string>(
  condition: boolean,
  metValue: MetValue<T>,
  unmetValue: T,
): T {
  if (condition) {
    return typeof metValue === 'function' ? metValue?.() : metValue;
  }
  return unmetValue;
}
