import when from '../index';

describe('return value', () => {
  test('met value', () => {
    const t = when(true, 1, 2);

    expect(t).toBe(1);
  });

  test('unmet value', () => {
    const t = when(false, 1, 2);

    expect(t).toBe(2);
  });
});

describe('return value by func', () => {
  test('met value', () => {
    const t = when(
      true,
      () => ({ env: 'development' }),
      () => ({ env: 'production' }),
    );
    expect(t).toEqual({ env: 'development' });
  });

  test('unmet value', () => {
    const t = when(
      false,
      () => ({ env: 'development' }),
      () => ({ env: 'production' }),
    );
    expect(t).toEqual({ env: 'production' });
  });
});

describe('only run func', () => {
  const metFunc = jest.fn();
  const unmetFunc = jest.fn();

  test('met value', () => {
    when(true, metFunc, unmetFunc);
    expect(metFunc.mock.calls.length).toBe(1);
    expect(unmetFunc).not.toBeCalled();
  });
});
