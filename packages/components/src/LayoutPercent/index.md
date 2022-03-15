---
title: LayoutPercent
nav:
  order: 3
  title: Components
  path: /components
group:
  title: 通用
  path: /common
toc: false
mobile: true
---

# LayoutPercent

百分比布局容器组件

根据指定的背景图、背景图宽高比例，通过设置容器的 padding-top 撑开容器，让图片铺满容器背景，目的是避免页面重绘、优化页面加载时的抖动体验。

> padding 的百分比是相对于父元素宽度，如果父元素有宽度，相对于父元素宽度，如果没有，找其父辈元素的宽度，均没设宽度时，相对于屏幕的宽度。

## 基本用法

<code src="./demos/Basic.tsx" />

## 仅需要背景图

<code src="./demos/OnlyBg.tsx" />

## 依靠图片自适应撑开

<code src="./demos/Auto.tsx" />

<API />

#### Bg

| 参数          | 说明                             | 类型      | 必填 | 默认值      |
| ------------- | -------------------------------- | --------- | ---- | ----------- |
| src           | 图片链接                         | `string`  | 是   | --          |
| naturalWidth  | 图片的真实宽度                   | `number`  | 否   | --          |
| naturalHeight | 图片的真实高度                   | `number`  | 否   | --          |
| onlyBg        | 仅用于处理背景图，不需要 content | `boolean` | 否   | `undefined` |
