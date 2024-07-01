import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Checkbox, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { type QuestionRadioPropsType } from './index'

const PropsComponent = (props: QuestionRadioPropsType) => {
  const { title, option = [], defaultOption = 0, isVertical } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ title, option, defaultOption, isVertical })
  }, [title, option, defaultOption, isVertical])

  const onChange = (changedValues: QuestionRadioPropsType) => {
    editComponent(changedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, option, defaultOption: option[defaultOption], isVertical }}
      onValuesChange={onChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项" name="option">

      </Form.Item>
      <Form.Item label="默认选中" name="defaultOption">
        <Select
          options={
            option?.map((o, i) => ({ value: o, text: o })) ?? []
          }
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
