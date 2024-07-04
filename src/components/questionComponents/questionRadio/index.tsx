import { Radio, Space, Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Paragraph } = Typography

export type optionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  options?: optionType[]
  value?: string
  isVertical?: boolean
}

export const defaultQuestionRadioProps: QuestionRadioPropsType = {
  title: '单选标题',
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
  isVertical: false,
}

const QuestionRadio: FC<QuestionRadioPropsType> = (props) => {
  const {
    title,
    options = [],
    value,
    isVertical,
  } = { ...defaultQuestionRadioProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((o) => (
            <Radio key={o.value} value={o.value}>
              {o.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default {
  title: '单选框',
  type: 'questionRadio',
  Component: QuestionRadio,
  PropsComponent,
  defaultProps: defaultQuestionRadioProps,
}
