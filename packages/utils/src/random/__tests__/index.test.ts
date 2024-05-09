import random from '../index';

test('random', () => {
  const min = 0;
  const max = 10;
  let ran;

  for (let i = 0; i < 100; i++) {
    ran = random(min, max);
    expect(ran).toBeGreaterThanOrEqual(0);
    expect(ran).toBeLessThan(10);
    expect(ran === 10).toBeFalsy();
  }
});
