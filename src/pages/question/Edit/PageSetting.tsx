import { PageInfoType, usePageInfoStore } from '@/store/usePageInfoStore'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'

const { TextArea } = Input

const PageSetting = () => {
  const [form] = Form.useForm()
  const { pageInfo, resetPageInfo } = usePageInfoStore()

  useEffect(() => {
    const { title, desc, js, css } = pageInfo
    form.setFieldsValue({ title, desc, js, css })
  }, [pageInfo])

  const onChange = (_: any, allValues: PageInfoType) => {
    resetPageInfo(allValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={onChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea rows={3} />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
