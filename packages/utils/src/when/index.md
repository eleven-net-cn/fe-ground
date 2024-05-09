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

> 这个函数的意义是，让代码编写更优雅一些。

## 基本用法

```ts
import { when } from '@e.fe/utils';

const isDev = process.env.NODE_ENV === 'development';
const obj = when(
  isDev,
  {
    env: 'development',
  },
  {
    env: 'production',
  },
);
```

## 执行函数返回

```ts
import { when } from '@e.fe/utils';

const isDev = process.env.NODE_ENV === 'development';
const obj = when(
  isDev,
  () => 'development',
  () => 'production',
);
```

## 仅执行函数，不返回

```ts
import { when } from '@e.fe/utils';

const isDev = process.env.NODE_ENV === 'development';

when(
  isDev,
  () => {
    console.log('development');
  },
  () => {
    console.log('production');
  },
);
```

## 封装更多场景

```ts
import { when } from '@e.fe/utils';

// 二次封装，让代码更加简洁
function whenIsDev<T>(metValue: T, unmetValue: T): T {
  const isDev: boolean = process.env.NODE_ENV === 'development';
  return when(isDev, metValue, unmetValue);
}
```

## API

```ts
function when<T = string>(
  condition: boolean,
  metValue: FuncOrValue<T>,
  unmetValue: FuncOrValue<T>,
): T;
```

#### FuncOrValue

```ts
type FuncOrValue<T> = T extends Function ? never : T | (() => T);
```
