/**
 * title: 仅需要背景图
 * desc: 只会渲染一个 div，不会有其它多余的元素
 * defaultShowCode: true
 */

import React from 'react';
import { LayoutPercent } from '@e.react/components';

export default () => {
  return (
    <>
      <LayoutPercent
        bg={{
          src:
            'http://fdfs.xmcdn.com/storages/2f8e-audiofreehighqps/00/B6/CMCoOScEC-h8AAKsLACLToyC.jpg',
          naturalWidth: 375,
          naturalHeight: 100,
          onlyBg: true,
        }}
      />
    </>
  );
};
