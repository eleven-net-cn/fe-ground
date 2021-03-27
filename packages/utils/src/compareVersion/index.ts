type CompareResult = 1 | -1 | 0;

/**
 * 比较版本号
 *  - v1 > v2 返回 1
 *  - v1 === v2 返回 0
 *  - v1 < v2 返回 -1
 *
 * @param v1 版本号 1
 * @param v2  版本号 2
 * @param seprator 分隔符，默认：.
 */
export default function compareVersion(
  v1: string,
  v2: string,
  seprator = '.',
): CompareResult {
  const arr1 = v1.split(seprator);
  const arr2 = v2.split(seprator);
  let result: CompareResult = 0;
  let i = 0;

  while (arr1[i] && arr2[i]) {
    if (+arr1[i] > +arr2[i]) {
      result = 1;
      break;
    } else if (+arr1[i] < +arr2[i]) {
      result = -1;
      break;
    } else {
      i++;
    }
  }

  if (arr1[i] === undefined && arr2[i] !== undefined && arr2[i] !== '0') {
    result = -1;
  } else if (
    arr1[i] !== undefined &&
    arr1[i] !== '0' &&
    arr2[i] === undefined
  ) {
    result = 1;
  }

  return result;
}
