import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/auth/tokens', {
    method: 'POST',
    data: params,
  });
}
