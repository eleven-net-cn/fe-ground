/**
 * title: 基本用法
 * desc:
 * defaultShowCode: true
 */

import React from 'react';
import { LayoutPercent } from '@e.react/components';
import './Basic.style.less';

export default () => {
  return (
    <>
      <LayoutPercent
        className="layout-demo-01"
        bg={{
          src:
            'http://fdfs.xmcdn.com/storages/2f8e-audiofreehighqps/00/B6/CMCoOScEC-h8AAKsLACLToyC.jpg',
          naturalWidth: 375,
          naturalHeight: 100,
        }}
      >
        容器中间的一行文字
      </LayoutPercent>
    </>
  );
};
