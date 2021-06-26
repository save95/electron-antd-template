import { stringify } from 'querystring';
import { history } from 'umi';
import { message } from 'antd';
import { setAuthority, Token } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { fakeAccountLogin } from './service';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if (response.id > 0) {
        message.success('登录成功！');

        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      console.log('logout');
      Token.clear();
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority({ token: payload.accessToken, roles: payload.roles });
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
