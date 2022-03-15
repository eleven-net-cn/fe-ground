interface Rect {
  /** 容器包裹元素的宽度 */
  naturalWidth: number;
  /** 容器包裹元素的高度 */
  naturalHeight: number;
}

export default function calculateContainerHeight(
  width: number,
  rect: Rect,
): number {
  return (
    Math.floor(((width * rect.naturalHeight) / rect.naturalWidth) * 10) / 10
  );
}
