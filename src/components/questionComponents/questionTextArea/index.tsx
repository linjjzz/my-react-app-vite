import { Input, Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Paragraph } = Typography
const { TextArea } = Input

export type QuestionTextAreaPropsType = {
  title?: string
  placeholder?: string
}

export const defaultQuestionTextAreaProps: QuestionTextAreaPropsType = {
  title: '多行输入框标题',
  placeholder: '请输入',
}

const QuestionTitle: FC<QuestionTextAreaPropsType> = (props) => {
  const { title, placeholder } = { ...defaultQuestionTextAreaProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea rows={4} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default {
  title: '输入框',
  type: 'questionTextArea',
  Component: QuestionTitle,
  PropsComponent,
  defaultProps: defaultQuestionTextAreaProps,
}
