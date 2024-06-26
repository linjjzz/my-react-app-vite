import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Checkbox, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { type QuestionTitlePropsType } from './index'

const PropsComponent = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  const onChange = (changedValues: QuestionTitlePropsType) => {
    editComponent(changedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={onChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
