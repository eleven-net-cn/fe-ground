/*
 * @Desc: 倒计时，格式化为天、时、分、秒、毫秒。
 * @Author: Eleven
 * @Date: 2020-12-10 10:06:41
 * @Last Modified by: Eleven
 * @Last Modified time: 2021-02-22 14:38:43
 */

import { useState, useEffect } from 'react';
import { usePersistFn } from 'ahooks';

interface Duration<T = string> {
  /** 剩余天数 */
  days: T;
  /** 剩余小时 */
  hours: T;
  /** 剩余分钟 */
  minutes: T;
  /** 剩余秒 */
  seconds: T;
  /** 剩余毫秒 */
  milliseconds: T;
}

interface Options {
  /** 倒计时结束时的回调函数 */
  onEnd?: () => void;
  /** 是否需要格式化为左侧补 0 */
  format?: boolean;
  /**  倒计时的时间间隔 */
  interval?: number;
}

function toStr(num: number, format = false, formatLen = 2): string {
  if (typeof num !== 'number') return '';
  return format === true ? num.toString().padStart(formatLen, '0') : `${num}`;
}

function computeDuration(milliseconds: number, format = false): Duration {
  return {
    days: toStr(Math.floor(milliseconds / 86400000), format),
    hours: toStr(Math.floor(milliseconds / 3600000) % 24, format),
    minutes: toStr(Math.floor(milliseconds / 60000) % 60, format),
    seconds: toStr(Math.floor(milliseconds / 1000) % 60, format),
    milliseconds: toStr(Math.floor(milliseconds) % 1000, format, 3),
  };
}

function computeLeftTime(targetTime: number): number {
  const now = +new Date();
  return typeof targetTime === 'number' && targetTime > now
    ? targetTime - now
    : 0;
}

/**
 * 倒计时，格式化为天、时、分、秒、毫秒。
 *  - 取系统本地时间进行倒计时
 *
 * @param targetTime 倒计时目标时间（单位：毫秒）
 * @param options.onEnd 倒计时结束的回调函数
 * @param options.format 是否格式化（小于 10，在左侧补 0），默认：true
 * @param options.interval 更新倒计时的间隔时间（单位：毫秒），默认：1000
 */
const useCountDown = (targetTime: number, options?: Options) => {
  const { onEnd, format = true, interval = 1 * 1000 } = options || {};
  const [duration, setDuration] = useState<Duration>(
    computeDuration(computeLeftTime(targetTime), format),
  );

  const onEndPersistFn = usePersistFn(() => {
    typeof onEnd === 'function' && onEnd();
  });

  useEffect(() => {
    setDuration(computeDuration(computeLeftTime(targetTime), format));
    const timer = window.setInterval(() => {
      const leftTime = computeLeftTime(targetTime);

      setDuration(computeDuration(leftTime, format));
      if (leftTime <= 0) {
        onEndPersistFn();
        timer && window.clearInterval(timer);
      }
    }, interval);

    return () => {
      timer && window.clearInterval(timer);
    };
  }, [targetTime, onEndPersistFn, format, interval]);

  return duration;
};

export default useCountDown;
