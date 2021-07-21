---
title: parseUrl
nav:
  order: 5
  title: Utils
  path: /utils
group:
  title: 通用
  path: /common
mobile: false
---

# parseUrl

解析浏览器链接 url（兼容 browser router link / hash router link）

## 基本用法

```ts
import { parseUrl } from '@xmly/hi-utils';

const url =
  'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?test=abc&hello=world#zvyr-dqE9-';
const query = parseUrl(url);

console.log('query: ', query);

// {
//   url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
//   search: 'test=abc&hello=world',
//   query: { test: 'abc', hello: 'world' },
//   hash: 'zvyr-dqE9-',
// }
```

## Hash Router 链接

```ts
import { parseUrl } from '@xmly/hi-utils';

const url =
  'https://open.ximalaya.com/activities/welfare/#/coupon?test=abc&hello=world';
const query = parseUrl(url);

console.log('query: ', query);

// {
//   url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
//   search: 'test=abc&hello=world',
//   query: { test: 'abc', hello: 'world' },
//   hash: '',
// }
```

## API

```ts
function parseUrl(url: string): Result;
```

#### Result

| 参数   | 说明                                     | 类型                     |
| ------ | ---------------------------------------- | ------------------------ |
| url    | 链接 url（不带参数和锚点）               | `string`                 |
| search | 查询参数完整字符串，缺省时返回空字符串   | `string`                 |
| query  | 查询参数（对象），缺省时返回 `{}` 空对象 | `Record<string, string>` |
| hash   | 锚点 hash，缺省时返回空字符串            | `string`                 |
