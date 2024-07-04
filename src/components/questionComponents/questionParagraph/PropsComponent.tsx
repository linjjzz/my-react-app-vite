import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { type QuestionParagraphPropsType } from './index'

const { TextArea } = Input

const PropsComponent = (props: QuestionParagraphPropsType) => {
  const { text, isCenter } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  const onChange = (changedValues: QuestionParagraphPropsType) => {
    editComponent(changedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={onChange}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
