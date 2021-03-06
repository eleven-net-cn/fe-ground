/*
 * @Desc: dumi 文档编译配置
 *  - dumi config：https://d.umijs.org/zh-CN/config
 * @Author: Eleven
 * @Date: 2020-12-10 09:42:36
 * @Last Modified by: Eleven
 * @Last Modified time: 2021-03-27 15:03:39
 */

import { defineConfig } from 'dumi';

const isDev = process.env.NODE_ENV === 'development';
const publicPath = isDev ? '/' : `//fe-ground.eleven.net.cn/`;
const LOGO = 'https://avatars.githubusercontent.com/u/20358391';

export default defineConfig({
  // base: '/fe-ground/', // 没有部署在域名映射的根目录，必须要添加访问的路径作为 base
  publicPath,
  mode: 'site',
  title: 'FE-Ground',
  favicon: LOGO,
  logo: LOGO,
  outputPath: 'dist_docs',
  hash: true,
  history: {
    type: 'hash',
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  resolve: {
    // 默认值：['docs', 'src'] or ['docs', 'packages/pkg/src']
    // 一般不必传，除非出问题了
    // includes: [
    //   'docs',
    // ],
  },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/eleven-net-cn/fe-ground',
    },
    {
      title: '问题反馈',
      path: 'https://github.com/eleven-net-cn/fe-ground/issues',
    },
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
      'antd',
    ],
  ],
});
