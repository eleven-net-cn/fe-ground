---
title: when
nav:
  order: 5
  title: Utils
  path: /utils
group:
  title: 通用
  path: /common
mobile: false
---

# when

根据判断条件，执行函数或返回

## 基本用法

```ts
import { when } from '@e.fe/utils';

const isDev = process.env.NODE_ENV === 'development';
const obj = when(
  isDev,
  {
    test: 'development',
  },
  {
    test: 'production',
  },
);
```

## 函数回调

```ts
import { when } from '@e.fe/utils';

const isDev = process.env.NODE_ENV === 'development';
const obj = when(
  isDev,
  () => {
    return 'development';
  },
  () => {
    return 'production';
  },
);
```

## API

```ts
function when<T = string>(
  condition: boolean,
  metValue: MetValue<T>,
  unmetValue: T,
): T;
```
