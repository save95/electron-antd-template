import { Tag } from 'antd';
import React from 'react';

const { NODE_ENV } = process.env;
const HOSTS = {
  prod: '/api',
  development: 'http://127.0.0.1:8002',
};
// const RES_HOSTS = {
//   prod: '/',
//   development: `${HOSTS.development}/storage`,
// };
// console.log('NODE_ENV', NODE_ENV)

export const Company = 'Company';
export const Version = 'v0.0.1.609';

export const HOST = HOSTS[NODE_ENV] || HOSTS.prod;
export const TokenKey = 'necc_token';
export const AuthorityKey = 'necc_authority';

const DefaultPageSize = 20;
export const DefaultPager = {
  current: 1,
  pageSize: DefaultPageSize,
  showSizeChanger: true,
  pageSizeOptions: [20, 50, 100, 200],
  showTotal: (total) => {
    return `${total} 条`;
  },
};

export const Genders = {
  0: <Tag color="green">女</Tag>,
  1: <Tag color="blue">男</Tag>,
};
