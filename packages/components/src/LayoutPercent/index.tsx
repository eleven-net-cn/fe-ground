import React, { FC } from 'react';
import styled from 'styled-components';
import calculateContainerHeight from '../_utils/calculateContainerHeight';

const Wrapper = styled.div<{ bgImage?: string; heightPercent?: string }>`
  position: relative;
  z-index: 0;
  ${props => {
    return props.heightPercent
      ? `
        padding-top: ${props.heightPercent};
        background: url(${props.bgImage}) no-repeat center center / cover;
      `
      : ``;
  }};
`;

const Content = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BgImage = styled.img`
  width: 100%;
`;

/**
 * 如果同时给出 naturalWidth、naturalHeight，会自动计算容器高度，使用 background-image 铺满背景；
 * 否则，使用 img 自动撑开容器。
 */
interface Bg {
  /** 图片链接 */
  src: string;
  /** 图片的真实宽度 */
  naturalWidth?: number;
  /** 图片的真实高度 */
  naturalHeight?: number;
  /** 仅用于处理背景图，不需要 content */
  onlyBg?: boolean;
}

interface LayoutPercentProps {
  /** 背景图配置 */
  bg: Bg | string;
  /** 容器根节点上添加的 class */
  className?: string;
}

/**
 * 通用的带背景图 layout 布局
 *  根据 bg 的参数，自动切换容器布局方式
 *    - 如果同时给出 naturalWidth、naturalHeight 值，会自动计算容器高度，并撑开，将背景图片铺满容器；
 *    - 否则会依靠图片自动撑开容器；
 *
 * @param bg 背景图配置
 * @param className 容器根节点上添加的 class
 */
const LayoutPercent: FC<LayoutPercentProps> = ({ children, bg, className }) => {
  const bgImage =
    typeof bg === 'string' ? bg : typeof bg === 'object' ? bg?.src : '';

  // 如果给出 naturalWidth、naturalHeight 参数，使用 background-image
  if (typeof bg === 'object' && bg?.naturalHeight && bg?.naturalWidth) {
    const percent = calculateContainerHeight(100, {
      naturalWidth: bg.naturalWidth,
      naturalHeight: bg.naturalHeight,
    });

    return (
      <Wrapper
        className={className}
        bgImage={bgImage}
        heightPercent={`${percent}%`}
      >
        {!bg.onlyBg && <Content>{children}</Content>}
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <Content>{children}</Content>
      <BgImage src={bgImage} alt="" />
    </Wrapper>
  );
};

export default LayoutPercent;
