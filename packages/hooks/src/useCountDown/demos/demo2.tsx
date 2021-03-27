/**
 * title: 倒计时结束后执行函数
 * desc: 函数不需要 useCallback 包裹，内部已做持久化处理
 */

import React, { FC, useState } from 'react';
import { Button, message } from 'antd';
import { useCountDown } from '@e.react/hooks';

interface TimerProps {
  targetTime: number;
}

const Timer: FC<TimerProps> = ({ targetTime }) => {
  const { seconds } = useCountDown(targetTime, {
    onEnd() {
      // 函数不需要 useCallback 包裹，内部已做持久化处理
      message.info('倒计时已结束');
    },
    format: false, // 是否格式化（小于 10，在左侧补 0），默认：true
  });

  return <div>{`${seconds} 秒`}</div>;
};

const CountDown: FC = () => {
  const [targetTime, setTargetTime] = useState<number>();

  const createTimer = () => {
    const mockTargetTime = Date.now() + 10 * 1000;
    setTargetTime(mockTargetTime);
  };

  return (
    <>
      <Button type="primary" onClick={createTimer}>
        点击开始一个 10 秒倒计时
      </Button>
      <div style={{ marginTop: '16px' }}>
        {targetTime && <Timer targetTime={targetTime} />}
      </div>
    </>
  );
};

export default CountDown;
