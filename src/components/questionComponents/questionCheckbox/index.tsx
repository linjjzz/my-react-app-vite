import { Checkbox, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

const { Paragraph } = Typography

export type listType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: listType[]
}

export type QuestionCheckboxStatPropsType = {
  stat: { name: string; count: number }[]
}

export const defaultQuestionCheckboxProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
  isVertical: false,
}

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props) => {
  const {
    title,
    list = [],
    isVertical,
  } = { ...defaultQuestionCheckboxProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((item) => (
          <Checkbox key={item.value} value={item.value} checked={item.checked}>
            {item.text}
          </Checkbox>
        ))}
      </Space>
    </div>
  )
}

export default {
  title: '多选框',
  type: 'questionCheckbox',
  Component: QuestionCheckbox,
  PropsComponent,
  StatComponent,
  defaultProps: defaultQuestionCheckboxProps,
}
