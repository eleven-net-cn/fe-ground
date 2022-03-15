/**
 * title: 依靠图片自适应撑开
 * desc: 不设置容器高度，自适应图片的高度撑开容器，组件渲染时（图片加载完成）会有抖动现象。
 * defaultShowCode: true
 */

import React from 'react';
import { LayoutPercent } from '@e.react/components';
import './Auto.style.less';

export default () => {
  return (
    <>
      <LayoutPercent
        className="layout-demo-03"
        bg="http://fdfs.xmcdn.com/storages/6beb-audiofreehighqps/41/FD/CMCoOSQEC-fxAAOsLgCLTkvV.png"
      >
        容器中间的一行文字
      </LayoutPercent>
    </>
  );
};
