import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import type { QuestionRadioPropsType, optionType } from './index'

const PropsComponent = (props: QuestionRadioPropsType) => {
  const { title, options = [], value = 0, isVertical } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ title, options, value, isVertical })
  }, [title, value, options, isVertical])

  const handleValuesChange = (_: any, allvalues: QuestionRadioPropsType) => {
    let newOpt: optionType[]
    if (allvalues.options) {
      newOpt = allvalues.options.filter((opt) => !(opt.text == null))
      editComponent({ ...allvalues, options: newOpt })
    }
    const { options = [] } = allvalues
    newOpt = options.map((opt) => {
      if (opt.value) return opt
      return { ...opt, value: nanoid() }
    })
    let newComponent: QuestionRadioPropsType
    newComponent = { ...allvalues, options: newOpt }
    editComponent(newComponent)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, text) {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: optionType) => {
                              if (opt.text === text) num++
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  block
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ value, text }) => ({
            value,
            label: text || '',
          }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
