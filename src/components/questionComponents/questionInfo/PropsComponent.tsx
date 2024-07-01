import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { type QuestionInfoPropsType } from './index'

const { TextArea } = Input

const PropsComponent = (props: QuestionInfoPropsType) => {
  const { title, text } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ title, text })
  }, [title, text])

  const onChange = (changedValues: QuestionInfoPropsType) => {
    console.log(changedValues)

    editComponent(changedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, text }}
      onValuesChange={onChange}
    >
      <Form.Item
        label="标题内容"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
