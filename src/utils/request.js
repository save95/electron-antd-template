/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { HOST, TokenKey } from '@/const';
import qs from 'qs';
import { history } from 'umi';
import licenseSettings from '../../config/licenseSettings';

const codeMessage = {
  200: '成功',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '服务错误',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '资源不存在',
  406: '请求的格式不可得。',
  410: '资源不存在（被永久性删除）',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response = {}, data = {} } = error;
  const { headers } = response;

  // 软件未注册拦截
  const errorCode = headers.get('X-Error-Code');
  if (licenseSettings.enabled) {
    if (errorCode === '1438') {
      history.push('/license');
      return;
    }
  }

  const { message: errMsg } = data;
  if (errMsg && errMsg.length > 0) {
    message.error(errMsg);
  } else {
    const { status, statusText } = response;
    const errorText = codeMessage[status] || statusText || '系统异常';

    notification.error({
      message: `系统错误`,
      description: errorText,
    });
  }

  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
      skipNulls: true,
    }),
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  return {
    url: `${HOST}${url}`,
    options: {
      ...options,
      headers: {
        ...options.headers,
        'X-Token': localStorage.getItem(TokenKey) || '',
      },
    },
  };
});

export default request;
