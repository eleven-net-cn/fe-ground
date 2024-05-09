import { renderHook } from '@testing-library/react-hooks';
import useCountDown from '../index';

// https://github.com/facebook/jest/issues/2234
jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);

describe('useCountDown hooks', () => {
  const ZERO = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000',
  };

  jest.useFakeTimers();

  it('未传入正确的目标时间', () => {
    const { result } = renderHook(() => useCountDown(0));
    expect(result.current).toEqual(ZERO);
  });

  it('传入正确的目标时间', () => {
    const { result } = renderHook(() => useCountDown(Date.now() + 5 * 1000));

    expect(Number(result.current.seconds)).toBeLessThanOrEqual(5);
    expect(Number(result.current.milliseconds)).toBeLessThanOrEqual(1000);
  });

  // it('倒计时结束执行回调', () => {
  //   const onEnd = jest.fn();
  //   const { result } = renderHook(() =>
  //     useCountDown(Date.now() + 5 * 1000, {
  //       onEnd,
  //     })
  //   );
  //   act(() => {
  //     jest.advanceTimersByTime(6 * 1000);
  //   });
  //   expect(onEnd).toBeCalledTimes(1);
  //   expect(result.current).toEqual(ZERO);
  // });
});
