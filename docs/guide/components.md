---
title: '@e.react/components'
order: 2
nav:
  title: 指南
  order: 1
---

# @e.react/components

`React` 组件库，非 UI 框架/库，囊括的组件通常包含 UI、交互等复杂逻辑。

## 示例

```ts
// 导入组件，示例
import { Foo } from '@e.react/components';

// 导入样式（所有 components 的样式）
// 配置按需加载以后，组件的样式会自动按需导入，不必添加此行
import '@e.react/components/lib/index.css';
```

## 按需加载

@e.react/components 的 JS 代码默认支持基于 ES modules 的 tree shaking。

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 插件，即可进一步实现 js 代码 和 css 样式代码都能按需加载，使用方法如下：

1. 安装

   ```bash
   yarn add babel-plugin-import -D
   ```

2. 在 babel 配置的 plugins 中添加配置（建议复制过去使用，手敲容易错漏）

   ```json
   plugins: [
     [
       'babel-plugin-import',
       {
         libraryName: '@e.react/components',
         libraryDirectory: 'es',
         camel2DashComponentName: false,
         style: true,
       },
       '@e.react/components'
     ],
   ]
   ```

   **配置注意：**

   1. `camel2DashComponentName` 参数必须为 false。
   2. `style` 参数必须为 true，不能设置为 css 或其它，

      这里设置为 true 即导入对应组件的 css 样式文件，`@e.react/components` 的组件不支持 less 文件或其它样式文件按需导入。

   3. 不要漏掉尾部的 `'@e.react/components'`，它是 plugin name，用来确保项目中配置的多个 `babel-plugin-import` 同时生效（如果有的话）。
