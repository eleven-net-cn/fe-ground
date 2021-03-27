/**
 * title: 基本用法
 * desc:
 * defaultShowCode: true
 */

import React, { FC } from 'react';
import { useCountDown } from '@e.react/hooks';

const CountDown: FC = () => {
  const yearFuture = 100;
  const dateStr = `${new Date().getFullYear() + yearFuture}-01-01 00:00:00`;
  const mockTargetTime = new Date(dateStr).getTime();
  const { days, hours, minutes, seconds } = useCountDown(mockTargetTime);

  return (
    <>
      <p>{`距离 ${yearFuture} 年后的元旦还有：`}</p>
      <div>{`${days} 天 ${hours} : ${minutes} : ${seconds}`}</div>
    </>
  );
};

export default CountDown;
