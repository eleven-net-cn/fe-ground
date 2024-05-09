interface Result {
  /** 链接 url（不带参数和锚点） */
  url: string;
  /** 查询参数完整字符串 */
  search: string;
  /** 查询参数（对象） */
  query: Record<string, string>;
  /** 锚点 hash */
  hash: string;
}

/**
 * 解析浏览器链接 url（兼容 browser router link / hash router link）
 * @param url  地址栏完整链接 url
 */
export default function parseUrl(url: string): Result {
  let urlWithPathname: string = '';
  let search: string = '';
  let hash: string = '';
  const query: Record<string, string> = {};

  const hasQuery = url.indexOf('?') > -1;

  if (hasQuery) {
    let searchAndHash: string;

    // eslint-disable-next-line prefer-const
    [urlWithPathname = '', searchAndHash = ''] = url.split('?', 2);
    [search = '', hash = ''] = searchAndHash.split('#', 2);
  } else {
    // 链接带 #/ ☞ 识别为 hash router path
    const isHashRouterLink = /#\//.test(url);

    if (isHashRouterLink) {
      const [urlPre = '', pathWithHash] = url.split('#/', 2);
      let routerPath: string = '';

      [routerPath = '', hash = ''] = pathWithHash.split('#', 2);
      urlWithPathname = `${urlPre}#/${routerPath}`;
    } else {
      [urlWithPathname, hash = ''] = url.split('#', 2);
    }
  }

  if (search) {
    const queryArr = search.split('&');

    for (let i = 0; i < queryArr.length; i++) {
      const p = queryArr[i].split('=', 2);

      query[p[0]] =
        p.length === 1 ? '' : decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
  }

  return {
    url: urlWithPathname,
    search,
    query,
    hash,
  };
}
