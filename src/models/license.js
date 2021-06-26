import { license, register, isLicensed } from '@/services/license';
import { history } from 'umi';

const UserModel = {
  namespace: 'license',
  state: {
    machineCode: '',
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(license);
      yield put({
        type: 'saveMachineCode',
        payload: response,
      });
    },

    *submit({ payload }, { call }) {
      const { message, error } = yield call(register, payload);

      if (error === undefined && message === 'success') {
        history.push('/user/login');
      }
    },

    *is(_, { call }) {
      yield call(isLicensed);
    },
  },
  reducers: {
    saveMachineCode(state, { payload }) {
      const { machineCode } = payload || {};
      return { ...state, machineCode };
    },
  },
};
export default UserModel;
