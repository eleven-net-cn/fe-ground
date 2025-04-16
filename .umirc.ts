/*
 * dumi config：https://d.umijs.org/zh-CN/config
 */

import { defineConfig } from 'dumi';

const LOGO = 'https://avatars.githubusercontent.com/u/20358391';

export default defineConfig({
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
    // previewLangs: ['jsx', 'tsx', 'html'],
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
  plugins: [
    // https://github.com/kkaaddff/plugin-dumi-vue
    // '@zhangqc/plugin-dumi-vue',
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
    [
      'babel-plugin-import',
      {
        libraryName: '@e.react/components',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true,
      },
      '@e.react/components',
    ],
  ],
  theme: {
    // theme config:
    // https://github.com/umijs/dumi/blob/master/packages/theme-default/src/style/variables.less
    // '@c-primary': '#1DA57A',
  },
  themeConfig: {
    carrier: 'fe-ground',
    // hd: {
    //   // 根据不同的设备屏幕宽度断点切换高清方案
    //   rules: [
    //     { maxWidth: 375, mode: 'vw', options: [100, 750] },
    //     { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
    //   ],
    //   // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    // },
  },
});
