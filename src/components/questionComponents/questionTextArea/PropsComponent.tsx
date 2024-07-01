import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { QuestionTitlePropsType } from '../questionTitle'
import { type QuestionTextAreaPropsType } from './index'

const PropsComponent = (props: QuestionTextAreaPropsType) => {
  const { title, placeholder } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  const onChange = (changedValues: QuestionTitlePropsType) => {
    editComponent(changedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={onChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
