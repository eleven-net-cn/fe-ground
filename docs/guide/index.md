---
title: '简介'
order: 1
nav:
  title: 指南
  order: 1
---

## TypeScript 支持

所有代码使用 TypeScript 书写，并提供了完整的定义文件。类型定义文件包含在包内，不必从 `@types` 安装。

## Tree Shaking 支持

所有包的 JS 代码默认支持基于 ES modules 的 tree shaking。

你自己项目中的 babel 配置，要确保 `@babel/preset-env` 的配置参数 `modules` 为 `false`（默认值是 `auto`），才能保证项目中 webpack 支持的 tree shaking 功能顺利生效。

## ES API Polyfill 支持

所有包编译时使用了 `@babel/plugin-transform-runtime`，代码中 ES API（如：`includes()`、`Object.assign()` 等）需要的 polyfill，会自动从 `@babel/runtime-corejs3` 按需导入，使用方无需做额外工作。

并将 `@babel/runtime-corejs3` 加入到了编译的 external 中，不会造成项目打包后有冗余的 polyfill 代码。

## 其它

1. 所有包暂不提供 `umd` 模块，因此也没有发布 CDN 资源，无法使用 `scrpit` 标签引入。
