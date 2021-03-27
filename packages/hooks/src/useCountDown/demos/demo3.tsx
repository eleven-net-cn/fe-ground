/**
 * title: 按毫秒滚动倒计时
 * desc: interval 间隔不宜太短，会浪费页面性能。如果页面有太多按毫秒滚动的倒计时，也许会导致页面性能降低（例如：无限懒加载的长列表中，每一条上都有倒计时），建议考虑用 GIF 动图模拟毫秒滚动效果。
 */

import React, { FC } from 'react';
import { useCountDown } from '@e.react/hooks';

const CountDown: FC = () => {
  const yearFuture = 100;
  const dateStr = `${new Date().getFullYear() + yearFuture}-01-01 00:00:00`;
  const mockTargetTime = new Date(dateStr).getTime();
  const { days, hours, minutes, seconds, milliseconds } = useCountDown(
    mockTargetTime,
    {
      interval: 100,
    },
  );

  return (
    <>
      <p>{`距离 ${yearFuture} 年后的元旦还有：`}</p>
      <div>{`${days} 天 ${hours} : ${minutes} : ${seconds}  ${milliseconds}`}</div>
    </>
  );
};

export default CountDown;
