---
order: 1
nav:
  title: 贡献代码
  path: /contribution
  order: 5
toc: menu
---

# 贡献代码

> GitHub 仓库：https://github.com/eleven-net-cn/fe-ground

## 基本要求

贡献代码需要遵循以下若干原则：

1. 复用性

   代码需要有较好的复用价值

2. 扩展性

   代码需要考虑向下兼容，尽量减少将来迭代时有破坏性的升级

3. 不重复造轮子

   例如：[lodash](https://www.lodashjs.com/)、[futil](https://smartprocure.github.io/futil-js/)、[dayjs](https://dayjs.gitee.io/docs/zh-CN/installation/installation) 等社区资源已有的解决方案及 API，不建议再造一个

4. 提供完整的 `Demo` 测试、`Jest` 单元测试、`API` 文档

5. 编码风格统一、规范统一

   - 请保持代码的命名（变量、文件、目录等）、目录结构等一致
   - 请保持 `markdown` 文档的层级、标题、表格项等格式一致

## 开发调试

1. 安装依赖

   项目是 `lerna` + `yarn workspaces` 多包结构，你只需要在根目录执行命令安装一次包即可（无需在子目录操作安装，也无需运行 `lerna bootstrap`）。

   ```bash
   yarn
   ```

2. 运行文档及 `Demo` 测试

   项目基于 [dumi](https://d.umijs.org/zh-CN) 来构建、编译文档，同时，在文档站点中嵌入运行 Demo 调试代码。

   ```bash
   yarn docs:start
   ```

3. 运行 `Jest` 单元测试

   需要先切换到对应目录，例如你需要新增一个 React Components，命令如下：

   ```bash
   # 切换到子目录
   cd packages/components

   # 运行测试，watch 监听
   yarn test:watch
   ```

## 依赖包管理

`FE-Ground` 是 `lerna + yarn workspaces` 的多包结构，使用 [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces) 管理包依赖，推荐按如下方式操作：

1. 给单个 package 安装依赖

   例如，需要在 `@e.fe/utils` 中安装 `lodash`，终端命令示例如下：

   ```bash
   # 如果执行命令提示类似的错误 ☞ error An unexpected error occurred: "expected workspace package to exist for \"@babel/template\"".
   # 请尝试将 yarn 降级到 v1.18.0，
   # https://github.com/yarnpkg/yarn/issues/7807
   yarn workspace @e.fe/utils add lodash
   ```

   如果无法使用上述方式安装，可以在子包的 `package.json` 中填写依赖，到根目录执行 `yarn` 安装。

   <Alert type="error">
   注意：请勿在子目录下直接安装依赖包，这会导致依赖包出现在子包的 node_modules 中，虽然并不会导致运行、编译出错（正常情况下，依赖包都应该出现在根目录的 node_modules 中）。
   </Alert>

2. 给所有 package 安装相同的依赖

   所有子包都需要的依赖，不能在 Root 安装，否则，依赖无法出现在 package 的 `dependencies`、`devDependencies` 中，包发布以后安装、使用会遇到问题。

   例如，所有 package 都需要依赖 `@babel/runtime-corejs3`，终端命令示例如下：

   ```bash
   yarn workspaces run add @babel/runtime-corejs3
   ```

3. 给 Root 安装依赖

   在根目录，一般是安装项目的开发工具等，所有 package 都需要的依赖不能在此处安装。在根目录执行命令需带上 `-W`，例如需要安装 `lerna`，终端命令示例如下：

   ```bash
   yarn add lerna -W -D
   ```

依赖包的卸载、更新，将 `add` 更换为 `remove、upgrade` 即可。

> 编译时，`dependencies`、`peerDependencies` 会自动被加入到 rollup 的 external 配置。

## Demo 编写

组件 demo 的编写，请参照 dumi 官方关于 [demo 编写的介绍](https://d.umijs.org/zh-CN/guide/basic#%E5%86%99%E7%BB%84%E4%BB%B6-demo) 了解更多。

Demo 的 `.tsx` 文件头部，可以定义若干参数控制 Demo 的渲染展示。主要的参数如下：

```ts
/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 * defaultShowCode: true
 */
```

> 更多参数请从 dumi 文档查阅。

Demo 编写需要遵循以下原则：

1. 能看能用
2. 依赖清晰
3. 易于维护

Demo 测试编写需要达到以下效果：

1. 测试用途

   实际地运行示例，详细检验实现效果

2. 最佳实践用途

   使用者可以一键复制代码使用

## API 文档编写

组件、函数的 API 文档，最终会被 [dumi](https://d.umijs.org/zh-CN) 解析、编译，`.md` 文件头部可以定义若干参数，来控制文档的展示，如下：

```md
---
title: 自定义页面名称
nav:
  path: /自定义导航路由
  title: 自定义导航名称
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /自定义分组路由，注意，分组路由 = 导航路由 + 自己
  title: 自定义分组名称
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

<!-- 其他 Markdown 内容 -->
```

文档编写：

1. 文档中的标题，按照 `#`、`##`、`####`、`######` 逐渐递增（字号逐渐递减）。
2. 必须包含 `API`、`参数`、`返回值` 3 项，详细描述入参、返回。
3. 参数、返回值、类型的展示以表格形式，表格项请参照现有示例。

## Components 样式

`@e.react/components` 的组件样式，必须放置在 `style` 目录下。

1. 支持 `styled-components` 编写样式代码（`styled-components` 代码不必放在 `style` 目录）

   > 如果组件想要在营销平台使用，必须用 `styled-components` 编写样式代码（营销平台不支持独立引入 `css` 代码，编译会不通过）

2. 支持 `less`、`css` 编写样式代码

3. `style/index.less` 作为所有样式文件的入口

   如果样式代码较少，直接在 `style/index.less` 中编写样式代码即可

4. `style/index.ts` 必须导入 `style/index.less`

5. `style` 目录必须存在，并且必须有 `style/index.ts`（即使文件内容为空，没有导入任何样式代码）

> 组件库编译后，`style/index.ts` 将被编译为 `es/**/style/index.js`、`lib/**/style/index.js`，插件 `babel-plugin-import` 在按需加载过程中会使用到。  
> 因此，无论是否有 `less`、`css` 样式，无论是否使用 `styled-components` 编写样式代码，都必须保留 `style/index.ts`。