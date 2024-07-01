import { Radio, RadioChangeEvent, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'
import PropsComponent from './PropsComponent'

const { Paragraph } = Typography

export type QuestionRadioPropsType = {
  title?: string
  option?: string[]
  defaultOption?: number
  isVertical?: boolean
}

export const defaultQuestionRadioProps: QuestionRadioPropsType = {
  title: '一行标题',
  option: ['选项 1', '选项 2', '选项 3'],
  defaultOption: 0,
  isVertical: false,
}

const QuestionRadio: FC<QuestionRadioPropsType> = (props) => {
  const {
    title = '',
    option = ['选项 1', '选项 2', '选项 3'],
    defaultOption = 0,
    isVertical = false,
  } = { ...defaultQuestionRadioProps, ...props }

  const [value, setValue] = useState(defaultOption)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {option.map((o, i) => <Radio key={i} value={i}>{o}</Radio>)}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default {
  title: '标题',
  type: 'questionRadio',
  Component: QuestionRadio,
  PropsComponent,
  defaultProps: defaultQuestionRadioProps,
}
