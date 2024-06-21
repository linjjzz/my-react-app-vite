import React, { FC } from 'react'
import { Form, Input, Space, Button, Typography, Checkbox, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { loginInfo, loginService } from '@/services/request';
import { setToken } from '@/utils/token';

const { Title } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()

  const { loading, run: onFinish } = useRequest(
    async (value: loginInfo) => {
      const { username, password } = value
      const loginData: loginInfo = {
        username,
        password
      }

      return await loginService(loginData)
    },
    {
      manual: true,
      onSuccess: (data) => {
        const { token } = data
        setToken(token)
        message.success('登录成功')
        nav('/manage/list')
      }
    }
  )


  return (
    <Form
      {...layout}
      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: 350 }}
    >
      <Form.Item {...tailLayout}>
        <Title level={2}>
          <Space>
            <UserAddOutlined />
            用户登录
          </Space>
        </Title>
      </Form.Item>
      <Form.Item name="useName" label="用户名" rules={[
        { required: true, message: '请输入用户名' },
        { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
        { pattern: /^\w+$/, message: '字母数字下划线' }
      ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        {...tailLayout}
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            登录
          </Button>
          <Button type="link" htmlType="button" onClick={() => nav('/register')}>
            去注册
          </Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default Login
