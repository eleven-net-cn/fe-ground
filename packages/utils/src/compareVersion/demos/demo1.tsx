/**
 * title: 比较版本号
 * desc: 查看返回的比较结果
 */

import React from 'react';
import { Form, Input, Row, Col, Space, Button, message } from 'antd';
import { compareVersion } from '@e.fe/utils';

const colLayout = {
  sm: {
    span: 24,
  },
  md: {
    span: 24,
  },
  lg: {
    span: 8,
  },
};

interface FormValues {
  v1: string;
  v2: string;
}

export default () => {
  const [form] = Form.useForm();
  const initialValues = {
    v1: '6.5.7',
    v2: '6.3.8',
  };

  const compare = (values: FormValues) => {
    const { v1, v2 } = values || {};
    message.info(`比较的结果：${compareVersion(v1, v2)}`);
  };

  return (
    <div>
      <Form form={form} onFinish={compare} initialValues={initialValues}>
        <Row gutter={24}>
          <Col {...colLayout}>
            <Form.Item
              name="v1"
              label="版本号 v1"
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="请输入版本号 v1，示例：6.7.8" allowClear />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item
              name="v2"
              label="版本号 v2"
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="请输入版本号 v2，示例：6.7.8" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start">
          <Space>
            <Button type="primary" htmlType="submit">
              比较
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  );
};
