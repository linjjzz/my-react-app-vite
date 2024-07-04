import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import type { QuestionCheckboxPropsType, listType } from './index'

const PropsComponent = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical } = props
  const [form] = Form.useForm()
  const { editComponent } = useComponentInfoStore()

  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical })
  }, [title, list, isVertical])

  const handleValuesChange = (_: any, allvalues: QuestionCheckboxPropsType) => {
    let newList: listType[]
    if (allvalues.list) {
      newList = allvalues.list.filter(item => !(item.text == null))
      editComponent({ ...allvalues, options: newList })
    }
    const { list = [] } = allvalues
    newList = list.map((item) => {
      if (item.value) return item
      return { ...item, value: nanoid() }
    })

    let newComponent: QuestionCheckboxPropsType
    newComponent = { ...allvalues, list: newList }
    editComponent(newComponent)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, list, isVertical }}
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
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {
                      <Form.Item
                        name={[name, 'checked']}
                        valuePropName='checked'
                      >
                        <Checkbox />
                      </Form.Item>
                    }
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, text) {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: listType) => {
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
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  block
                  type="link"
                  onClick={() => add({ label: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
