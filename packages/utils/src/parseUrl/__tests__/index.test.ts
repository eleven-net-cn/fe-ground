import parseUrl from '../index';

describe('parseUrl browser router link', () => {
  test('普通标准链接', () => {
    const url = 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc';

    expect(parseUrl(url)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: '',
      query: {},
      hash: '',
    });
  });

  test('带参数', () => {
    const url =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?test=abc&hello=world';

    expect(parseUrl(url)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: '',
    });
  });

  test('带锚点', () => {
    const url =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc#zvyr-dqE9-';

    expect(parseUrl(url)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: '',
      query: {},
      hash: 'zvyr-dqE9-',
    });
  });

  test('带参数、带锚点', () => {
    const url =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?test=abc&hello=world#zvyr-dqE9-';

    expect(parseUrl(url)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: 'zvyr-dqE9-',
    });
  });
});

describe('parseUrl hash router link', () => {
  test('前端 hash 路由', () => {
    const url_01 = 'https://open.ximalaya.com/activities/welfare#/coupon';
    const url_02 = 'https://open.ximalaya.com/activities/welfare/#/coupon';

    expect(parseUrl(url_01)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare#/coupon',
      search: '',
      query: {},
      hash: '',
    });

    expect(parseUrl(url_02)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: '',
      query: {},
      hash: '',
    });
  });

  test('前端 hash 路由、带参数', () => {
    const url =
      'https://open.ximalaya.com/activities/welfare/#/coupon?test=abc&hello=world';

    expect(parseUrl(url)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: '',
    });
  });

  test('前端 hash 路由、带锚点（锚点无用）', () => {
    const url =
      'https://open.ximalaya.com/activities/welfare/#/coupon#test_hash';

    expect(parseUrl(url)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: '',
      query: {},
      hash: 'test_hash',
    });
  });

  test('前端 hash 路由、带参数、带锚点（锚点无用）', () => {
    const url =
      'https://open.ximalaya.com/activities/welfare/#/coupon?test=abc&hello=world#test_hash';

    expect(parseUrl(url)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: 'test_hash',
    });
  });
});

describe('校验不合法链接场景', () => {
  test('带多个锚点，仅取第一个', () => {
    const urlBrowser =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?test=abc&hello=world#zvyr-dqE9-#test_hash';
    const urlHash =
      'https://open.ximalaya.com/activities/welfare/#/coupon?test=abc&hello=world#test_hash#hello#world';

    expect(parseUrl(urlBrowser)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: 'zvyr-dqE9-',
    });

    expect(parseUrl(urlHash)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: 'test_hash',
    });
  });

  test('多个 ? 查询参数，仅第一个 ? 问号有效', () => {
    const urlBrowser =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?test=abc&hello=world?uid=123456&from=wx#zvyr-dqE9-';
    const urlHash =
      'https://open.ximalaya.com/activities/welfare/#/coupon?uid=123456&from=wx?test=abc&hello=world#test_hash';

    expect(parseUrl(urlBrowser)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: 'test=abc&hello=world',
      query: { test: 'abc', hello: 'world' },
      hash: '',
    });
    expect(parseUrl(urlHash)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: 'uid=123456&from=wx',
      query: { uid: '123456', from: 'wx' },
      hash: '',
    });
  });

  test('锚点前带/', () => {
    const urlBasic =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc#/zvyr-dqE9-';
    const urlBrowser =
      'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc?uid=123456&from=wx#/zvyr-dqE9-';
    const urlHash =
      'https://open.ximalaya.com/activities/welfare/#/coupon?uid=123456&from=wx#/test_hash';

    expect(parseUrl(urlBasic)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc#/zvyr-dqE9-',
      search: '',
      query: {},
      hash: '',
    });
    expect(parseUrl(urlBrowser)).toEqual({
      url: 'https://pages.ximalaya.com/mkt/act/cfb855beeaed9ebc',
      search: 'uid=123456&from=wx',
      query: { uid: '123456', from: 'wx' },
      hash: '/zvyr-dqE9-',
    });
    expect(parseUrl(urlHash)).toEqual({
      url: 'https://open.ximalaya.com/activities/welfare/#/coupon',
      search: 'uid=123456&from=wx',
      query: { uid: '123456', from: 'wx' },
      hash: '/test_hash',
    });
  });
});
