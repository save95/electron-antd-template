import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Form, Input, Button, Image, Row, Col, Divider } from 'antd';
import { connect } from 'umi';
import Style from './index.less';
import contactQrcode from '../../assets/contact.jpeg';
import licenseSettings from '../../../config/licenseSettings';

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};

const License = (props) => {
  const { machineCode, dispatch } = props
  const codes = machineCode.split('-')

  const [serial, setSerial] = useState("");

  useEffect(() => {
    dispatch({
      type: 'license/fetch',
    })
  }, []);

  const register = () => {
    dispatch({
      type: 'license/submit',
      payload: { machineCode, serial }
    });
  };

  return (
    <PageHeaderWrapper>
      <Card className={Style.license}>
        <Alert
          message="未获得授权，请联系客服或者渠道经纪人"
          type="error"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Paragraph>
          1、请使用微信扫码下方二维码加专属客服询价并购买软件
        </Typography.Paragraph>
        <Typography.Paragraph strong>
          2、请复制右侧的「机器码」，并发送给专属客服
        </Typography.Paragraph>
        <Typography.Paragraph>
          3、请将购买的「授权码」粘贴至右侧输入框内，并点击「注册软件」按钮完成认证。
        </Typography.Paragraph>

        <Divider />

        <Row>
          <Col flex={1}>
            <Image src={contactQrcode} height={200} preview={false} />
            <Typography.Paragraph strong>
              微信号<code>{licenseSettings.contactWechat}</code>
            </Typography.Paragraph>
          </Col>
          <Col flex={4}>
            <Form {...formLayout}>
              <Form.Item name="machineCode" label="机器码">
                <Input.Group className={Style.code}>
                  <Input className={Style.pre} value={codes[0]} disabled/>
                  <Input className={Style.split} placeholder="-" disabled/>
                  <Input className={Style.middle} value={codes[1]} disabled/>
                  <Input className={Style.split} placeholder="-" disabled/>
                  <Input className={Style.middle} value={codes[2]} disabled/>
                  <Input className={Style.split} placeholder="-" disabled/>
                  <Input className={Style.middle} value={codes[3]} disabled/>
                  <Input className={Style.split} placeholder="-" disabled/>
                  <Input className={Style.post} value={codes[4]} disabled/>
                </Input.Group>
                <Typography.Paragraph className={Style.copy} copyable={{ text: machineCode }}>复制</Typography.Paragraph>
              </Form.Item>

              <Form.Item name="serial" label="序号">
                <Input.TextArea
                  placeholder="请输入序号"
                  onChange={(ele) => setSerial(ele.currentTarget.defaultValue)}
                  onBlur={(ele) => setSerial(ele.currentTarget.defaultValue)}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 7, span: 13 }}>
                <Button type="primary" disabled={serial.length < 30} onClick={register}>注册软件</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>

      <Divider />
    </PageHeaderWrapper>
  )
}

export default connect(({ license }) => ({
  machineCode: license.machineCode,
}))(License)
