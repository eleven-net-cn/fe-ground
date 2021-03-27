import compareVersion from '../index';

describe('compareVersion(v1, v2)', () => {
  it('v1 === v2，结果为 0', () => {
    expect(compareVersion('6.7.8', '6.7.8')).toBe(0);
  });

  it('v1 > v2，结果为 1', () => {
    expect(compareVersion('6.9.7', '6.7.8')).toBe(1);
    expect(compareVersion('6.7.81', '6.7.8')).toBe(1);
  });

  it('v1 < v2，结果为 -1', () => {
    expect(compareVersion('6.7.4', '6.7.8')).toBe(-1);
    expect(compareVersion('6.7.8', '6.7.9')).toBe(-1);
  });

  it('v1 版本号不足 3 位', () => {
    expect(compareVersion('6.7', '6.7.8')).toBe(-1);
    expect(compareVersion('6.7', '6.7.0')).toBe(0);
  });

  it('v2 版本号不足 3 位', () => {
    expect(compareVersion('6.7.8', '6.7')).toBe(1);
    expect(compareVersion('6.7.0', '6.7')).toBe(0);
  });

  it('v1、v2 版本号均不足 3 位', () => {
    expect(compareVersion('6.7', '6.6')).toBe(1);
    expect(compareVersion('6.8', '6.9')).toBe(-1);
    expect(compareVersion('6.8', '6.8')).toBe(0);
  });
});
