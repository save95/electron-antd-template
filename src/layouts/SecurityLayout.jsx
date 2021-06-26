import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { User } from '@/utils/authority';

class SecurityLayout extends React.Component {
  render() {
    const { children, loading } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = currentUser && currentUser.userid;
    const user = User.get();
    const isLogin = user && user.id > 0;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (!isLogin && loading) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ loading }) => ({
  loading: loading.models.user,
}))(SecurityLayout);
