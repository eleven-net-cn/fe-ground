/*
 * father-build: https://github.com/umijs/father
 *  - 支持 lerna 结构，根目录配置 .fatherrc.ts，即可运行编译所有 package
 *  - package 目录配置的 .fatherrc.ts 会继承根目录的 .fatherrc.ts，
 *    因此，可以在单个 package 下新建 .fatherrc.ts 去添加独有的配置
 *
 * @Author: Eleven
 * @Date: 2021-03-01 09:48:31
 * @Last Modified by: Eleven
 * @Last Modified time: 2021-03-22 10:23:22
 */

export default {
  // disableTypeCheck: true,
  esm: 'rollup',
  cjs: 'rollup',
  runtimeHelpers: true,
  extraBabelPlugins: [
    [
      'babel-plugin-styled-components',
      {
        fileName: false,
      },
    ],
  ],
};
