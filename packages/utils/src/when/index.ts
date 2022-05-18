// https://github.com/microsoft/TypeScript/issues/37663
type FuncOrValue<T> = T extends Function ? never : T | (() => T);

/**
 * 根据判断条件，执行函数或返回
 * @param condition 判断条件
 * @param metValue 为 true 返回（或执行函数）
 * @param unmetValue 为 false 返回（或执行函数）
 */
export default function when<T = string>(
  condition: boolean,
  metValue: FuncOrValue<T>,
  unmetValue: FuncOrValue<T>,
): T {
  if (condition) {
    return typeof metValue === 'function' ? metValue?.() : metValue;
  }
  return typeof unmetValue === 'function' ? unmetValue?.() : unmetValue;
}
