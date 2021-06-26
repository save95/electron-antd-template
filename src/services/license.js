import request from '@/utils/request';

export async function license() {
  return request('/licenses');
}

export async function isLicensed() {
  return request('/licenses/is').catch((e) => {
    return { error: e };
  });
}

export async function register(params) {
  return request('/licenses', {
    method: 'POST',
    data: params,
  }).catch((e) => {
    return { error: e };
  });
}
