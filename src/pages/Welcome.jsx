import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
// import styles from './Welcome.less';

const Welcome = () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Alert
          message="感谢您注册，请尽情使用吧"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>Electron Antd Template</Typography.Text>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Welcome;
