/**
 * 生成随机数（包含最小值、不包含最大值）
 *
 * 更加灵活的随机数生成函数，推荐使用 [lodash 的 random](https://www.lodashjs.com/docs/latest#_randomlower0-upper1-floating)。
 *
 * 示例：
 * ```
 * const ran = random(1, 100)
 * ```
 *
 * @param min 随机数最小值（结果包含最小值）
 * @param max 随机数最大值（结果不包含最大值）
 */
export default function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
