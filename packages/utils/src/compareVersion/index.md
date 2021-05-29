---
title: compareVersion
nav:
  order: 5
  title: Utils
  path: /utils
group:
  title: 常用
  path: /common
mobile: false
---

# compareVersion

比较版本号

- `v1 > v2`，返回 `1`
- `v1 === v2`，返回 `0`
- `v1 < v2`，返回 `-1`

## 基本用法

<code src="./demos/demo1.tsx" />

## API

```ts
const result: CompareResult = compareVersion(v1: string, v2: string, seprator?: string);
```

## 参数

| 参数     | 说明     | 类型     | 必填 | 默认值      |
| -------- | -------- | -------- | ---- | ----------- |
| v1       | 版本号 1 | `string` | 是   | -           |
| v1       | 版本号 2 | `string` | 是   | -           |
| seprator | 分隔符   | `string` | 否   | `.`（圆点） |

## 返回值

#### CompareResult

| 参数   | 说明       | 类型               |
| ------ | ---------- | ------------------ |
| result | 比较的结果 | `1` \| `-1` \| `0` |
