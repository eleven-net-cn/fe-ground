/**
 * title: 基本用法
 * desc: 生成随机数，1~100，不包含 100。
 * defaultShowCode: true
 */

import React from 'react';
import { Button, message } from 'antd';
import { random } from '@e.fe/utils';

export default () => {
  const randomNum = () => random(1, 100);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          message.info(randomNum());
        }}
      >
        生成随机数（1~100，不包含 100）
      </Button>
    </>
  );
};
