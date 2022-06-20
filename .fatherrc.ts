/*
 * father-build: https://github.com/umijs/father
 *  - 支持 lerna 结构，根目录配置 .fatherrc.ts，即可运行编译所有 package
 *  - package 目录配置的 .fatherrc.ts 会继承根目录的 .fatherrc.ts，
 *    可以在单个 package 下新建 .fatherrc.ts 去添加独有的配置
 */

import path from 'path';
import fs from 'fs-extra';

const files = fs.readdirSync(path.resolve(__dirname, 'packages'));
const packages =
  files?.filter(dir =>
    fs.statSync(path.resolve(__dirname, 'packages', dir)).isDirectory(),
  ) ?? [];

export default {
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
  // 各个包之间可能相互有依赖，因此需要指定构建的先后顺序，确保构建时依赖引用不会出错
  // 需要指定顺序包明确列出，剩余子包会自动读取
  // https://github.com/umijs/father#pkgs
  pkgs: [...new Set([...packages])],
};
