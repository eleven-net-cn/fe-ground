---
title: random
nav:
  order: 5
  title: Utils
  path: /utils
group:
  title: 常用
  path: /common
mobile: false
---

# random

生成随机数（包含最小值、不包含最大值）

## 基本用法

<code src="./demos/Basic.tsx" />

## API

```ts
const result: number = random(min: number, max: number);
```

## 参数

| 参数 | 说明                             | 类型     | 必填 | 默认值 |
| ---- | -------------------------------- | -------- | ---- | ------ |
| min  | 随机数最小值（结果包含最小值）   | `number` | 是   | -      |
| max  | 随机数最大值（结果不包含最大值） | `number` | 是   | -      |

## 返回值

| 参数   | 说明         | 类型     |
| ------ | ------------ | -------- |
| result | 生成的随机数 | `number` |
