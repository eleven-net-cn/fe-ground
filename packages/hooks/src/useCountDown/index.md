---
title: useCountDown
nav:
  order: 4
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
mobile: false
---

# useCountDown

倒计时，格式化为天、时、分、秒、毫秒。

## 基本用法

<code src="./demos/demo1.tsx" />

## 倒计时结束执行函数

<code src="./demos/demo2.tsx" />

## 按毫秒滚动倒计时

<code src="./demos/demo3.tsx" />

## API

```ts
const duration: Duration = useCountDown(targetTime: number, options?: Options)
```

## 参数

| 参数       | 说明                         | 类型      | 必填 | 默认值 |
| ---------- | ---------------------------- | --------- | ---- | ------ |
| targetTime | 倒计时目标时间（单位：毫秒） | `number`  | 是   | -      |
| options    | 可选的若干参数               | `Options` | 否   | -      |

#### Options

| 参数     | 说明                               | 类型         | 必填 | 默认值     |
| -------- | ---------------------------------- | ------------ | ---- | ---------- |
| onEnd    | 倒计时结束的回调函数               | `() => void` | 否   | -          |
| format   | 是否格式化（小于 10，在左侧补 0）  | `boolean`    | 否   | `true`     |
| interval | 更新倒计时的间隔时间（单位：毫秒） | `number`     | 否   | `1 * 1000` |

## 返回值

| 参数     | 说明           | 类型       |
| -------- | -------------- | ---------- |
| duration | 格式化后的结果 | `Duration` |

#### Duration

| 参数         | 说明 | 类型     |
| ------------ | ---- | -------- |
| days         | 天   | `string` |
| hours        | 小时 | `string` |
| minutes      | 分钟 | `string` |
| seconds      | 秒   | `string` |
| milliseconds | 毫秒 | `string` |
