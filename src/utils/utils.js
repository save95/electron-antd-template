import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const annualOptions = () => {
  const options = [];
  const year = moment().year();
  for (let y = 2019; y <= year; y += 1) {
    options.push({
      label: `${y} 年`,
      value: y,
    });
  }

  return options;
};

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 */
export const fileSize = (size, pointLength) => {
  let csize = size;
  const units = ['B', 'K', 'M', 'G', 'TB'];
  let unit = units.shift();
  while (unit && csize > 1024) {
    unit = units.shift();
    csize /= 1024;
  }
  return (unit === 'B' ? csize : csize.toFixed(pointLength === undefined ? 2 : pointLength)) + unit;
};

/**
 * 将 ProTable 的搜索结果转换成请求参数
 * @param columns ProTable组件的列
 * @param params 搜索参数
 * @returns {{}}
 */
export const convertProSearch = (columns = [], params = {}) => {
  const res = {};
  // const filters = ['sorter', 'filter', 'current', 'pageSize'];
  columns.forEach((column) => {
    const key = column.dataIndex;
    const hide = column.hideInSearch === true || column.valueType === 'option';
    if (key && !hide) {
      res[key] = params[key] || undefined;
    }
  });
  return res;
};
