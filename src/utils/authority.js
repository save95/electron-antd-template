import { AuthorityKey, TokenKey } from '@/const';

const AUTHORITY_KEY = AuthorityKey;
const TOKEN_KEY = TokenKey;

const Token = {
  set({ accessToken, tokenType, expiresIn }) {
    if (accessToken) {
      localStorage.setItem(
        TOKEN_KEY,
        JSON.stringify({
          accessToken,
          tokenType,
          expiresIn,
        }),
      );

      return true;
    }

    return false;
  },

  get() {
    const tokenString = localStorage.getItem(TOKEN_KEY);
    let token;
    try {
      token = JSON.parse(tokenString);
    } catch (e) {
      token = tokenString;
    }

    return token || {};
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTHORITY_KEY);
  },
};

const User = {
  get(token = null) {
    let payload = {};
    try {
      const tokenStr = token && token.length > 32 ? token : Token.get();
      const payloadStr = atob(tokenStr.split('.')[1]);

      payload = JSON.parse(payloadStr);
    } catch (e) {
      // ignore
    }
    // 判断是否过期
    const { uid, exp } = payload;
    const timestamp = new Date().getTime() / 1000;
    if (!uid || exp <= timestamp) {
      return {};
    }

    const {
      uid: id,
      urg: authority,
      paid: parentAgentId,
      updated_at: updatedAt,
      phone_number: phoneNumber,
      name,
      nickname,
      gender,
      email,
    } = payload;

    return {
      id,
      authority,
      parentAgentId,
      name,
      nickname,
      gender: gender || -1,
      mobile: phoneNumber || '',
      email,
      updatedAt,
    };
  },
};

const Authority = {
  set({ roles, token }) {
    const proToken = typeof token === 'string' ? token : JSON.stringify(token);
    localStorage.setItem(TOKEN_KEY, proToken);

    const proAuthority = typeof roles === 'string' ? ['user', roles] : roles;
    return localStorage.setItem(AUTHORITY_KEY, JSON.stringify(proAuthority));
  },

  get(str) {
    // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
    const authorityString = typeof str === 'undefined' ? localStorage.getItem(AUTHORITY_KEY) : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
      authority = JSON.parse(authorityString);
    } catch (e) {
      authority = authorityString;
    }
    if (typeof authority === 'string') {
      return [authority];
    }
    return authority || ['admin'];
  },
};

const getAuthority = Authority.get;
const setAuthority = Authority.set;

export { Token, User, getAuthority, setAuthority };
