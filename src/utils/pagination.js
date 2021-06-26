const parse = (response) => {
  const cr = response.clone();

  const { headers } = cr;

  const pagination = {};
  // 简单分页
  if (!headers.has('X-Pagination-Info')) {
    pagination.hasMore = headers.get('X-More-Resource') === 'true';

    return pagination;
  }

  // 解析分页
  const infoStr = headers.get('X-Pagination-Info') || '';
  const info = infoStr.match(/count="(\d+)", rows="(\d+)", current="(\d+)", size="(\d+)"/) || [];
  pagination.total = Number(info[2] || 0);
  pagination.current = Number(info[3] || 1);
  pagination.pageSize = Number(info[4] || 20);

  return pagination;
};

export default {
  parse,
};
