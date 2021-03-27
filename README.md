# FE-Ground

通用的 React 组件库、自定义 Hooks 及 util 函数

## Documentation

https://fe-ground.eleven.net.cn/

## Technology

- lerna + yarn workspaces 的 `monorepo` 多包结构 —— yarn workspaces 处理多包的依赖，其它的交给 lerna
- [umijs dumi](https://d.umijs.org/zh-CN/) 集中编译所有包的 doc 文档、测试 demo
- [umijs father-build](https://github.com/umijs/father) 独立编译各子包
- [patch-package](https://github.com/ds300/patch-package) 调整 node_modules 包源码（因为给开源包贡献代码周期太长了）

  - 修改了 father-build（v1.19.1）的源码，调整 @babel/plugin-transform-runtime，增加 corejs 配置，以便自动导入 ES API 垫片（如：`includes()`、`Object.assign()` 等各类新 API 可直接使用，编译时会自动被导入垫片）

  - yarn workspaces 中使用 `patch-package` 的问题讨论：

    - [Support for Yarn workspaces/monorepos](https://github.com/ds300/patch-package/issues/42)
    - [Thoughts on yarn workspaces support](https://github.com/ds300/patch-package/issues/132)

## Command

```bash
# 在 packages/ 目录下自动生成代码，开发新的 SDK 包可以一键完成
yarn create-package     # 自动初始化创建新的 package

yarn docs:start         # 启动文档调试、测试 demo
yarn docs:build         # 打包文档、测试 demo


yarn test               # 运行所有 packages jest test
yarn test:coverage      # 查看所有 packages 测试覆盖率

yarn watch              # 监听所有 packages 编译
yarn build              # 打包所有 packages

yarn lint               # 运行 eslint
yarn lint:fix           # 运行 eslint fix
```

## Project Dir

```bash
├── .umi/                 # umijs 缓存目录（dumi 文档工具基于 umijs 生态）
├── docs/                 # 文档
│   ├── contribution/         # 贡献代码
│   ├── guide/                # 指南
│   └── index.md              # 首页
├── node_modules/         # 公共依赖（dumi、father-build、@umijs/test 等）
├── packages/             # 源码
│   ├── components/                 # react components
│   │   ├── es/                           # components 编译产物 - es modules
│   │   ├── lib/                          # components 编译产物 - cjs modules
│   │   ├── node_modules/                 # 子包依赖（如 @babel/runtime-corejs3 等）
│   │   ├── src/                          # components 源码
│   │   │   ├── ...
│   │   │   ├── Foo/                   # 百分比布局容器组件
│   │   │   │   ├── __tests__/                        # jest 单元测试
│   │   │   │   ├── demos/                             # 测试 demo
│   │   │   │   │   ├── demo1.style.less                  # 测试代码的样式
│   │   │   │   │   └── demo1.tsx                         # demo 测试
│   │   │   │   ├── style/                             # 组件样式
│   │   │   │   │   ├── index.less                        # 组件样式入口（less）
│   │   │   │   │   └── index.ts                          # 组件样式入口（ts）
│   │   │   │   ├── index.md                          # API 文档
│   │   │   │   └── index.ts                          # 组件源码
│   │   │   ├── ...
│   │   │   └── index.less                      # components 样式文件入口
│   │   │   └── index.ts                        # components 入口
│   │   ├── .fatherrc.ts                  # father-build 配置（集成根目录的 .fatherrc.ts 配置）
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── typings.d.ts                        # 全局类型定义
│   ├── hooks/                      # react hooks
│   │   ├── dist/                         # hooks 编译产物
│   │   ├── node_modules/                 # 子包依赖（如 @babel/runtime-corejs3 等）
│   │   ├── src/                          # hooks 源码
│   │   │   ├── ...
│   │   │   ├── useCountDown/                   # 倒计时 hooks
│   │   │   │   ├── __tests__/                        # jest 单元测试
│   │   │   │   ├── demos/                             # 测试 demo
│   │   │   │   ├── index.md                          # API 文档
│   │   │   │   └── index.ts                          # 源码
│   │   │   ├── ...
│   │   │   └── index.ts                        # hooks 入口
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── typings.d.ts
│   └── utils/                      # 通用 utils
│       ├── dist/                         # utils 编译产物
│       ├── node_modules/                 # 子包依赖（如 @babel/runtime-corejs3 等）
│       ├── src/                          # utils 源码
│       │   ├── ...
│       │   ├── compareVersion/                 # 版本号比较
│       │   │   ├── __tests__/                        # jest 单元测试
│       │   │   ├── demos/                             # 测试 demo
│       │   │   ├── index.md                          # API 文档
│       │   │   └── index.ts                          # 源码
│       │   ├── ...
│       │   └── index.ts                        # utils 入口
│       ├── README.md
│       ├── package.json
│       ├── tsconfig.json
│       └── typings.d.ts
├── patches/              # patch-package 修改 node_modules 包源码
│   └── father-build+1.19.1.patch   # 修改 father-build v1.19.1 源码
├── scripts/              # node 脚本
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .fatherrc.ts          # father-build 配置（会被子 package 中的 .fatherrc.ts 继承）
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .umirc.ts             # 文档使用 dumi 编译、打包
├── .yarnrc
├── lerna.json
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock             # 请勿手动删除，高危预警！
```

## About yarn workspaces

使用 [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces) 管理包依赖，推荐按如下方式操作：

1. 给单个 package 安装依赖

   例如，需要在 `@e.fe/utils` 中安装 `lodash`，终端命令示例如下：

   ```bash
   # 如果执行命令提示类似的错误 ☞ error An unexpected error occurred: "expected workspace package to exist for \"@babel/template\"".
   # 请尝试将 yarn 降级到 v1.18.0，
   # https://github.com/yarnpkg/yarn/issues/7807
   yarn workspace @e.fe/utils add lodash
   ```

   如果无法使用上述方式安装，可以在子包的 `package.json` 中填写依赖，到根目录执行 `yarn` 安装。

   请勿在子包目录下直接安装依赖包，这会导致依赖包出现在子包的 `node_modules` 中，虽然并不会导致运行、编译出错（正常情况下，依赖包都应该出现在根目录的 `node_modules` 中）。

2. 给所有 package 安装相同的依赖

   所有子包都需要的依赖，不能在 Root 安装，否则，依赖无法出现在 package 的 `dependencies`、`devDependencies` 中，包发布以后安装、使用会遇到问题。

   例如，所有 package 都需要依赖 `@babel/runtime-corejs3`，终端命令示例如下：

   ```bash
   yarn workspaces run add @babel/runtime-corejs3
   ```

3. 给 Root 安装依赖

   Root 一般是安装项目的开发工具等，所有 package 都需要的依赖不能在此处安装，在根目录执行命令需带上 `-W`，例如需要安装 `lerna`，终端命令示例如下：

   ```bash
   yarn add lerna -W -D
   ```

依赖包的卸载、更新，将 `add` 更换为 `remove、upgrade` 即可。

## About father-build

1. `dependencies`、`peerDependencies` 中的依赖，均会自动被列入到 rollup 编译的 external（babel 编译模式不会）。

2. 支持 lerna 结构，根目录配置 `.fatherrc.ts`，即可运行编译所有 package。

3. package 目录配置的 `.fatherrc.ts` 会继承根目录的 `.fatherrc.ts`。
