import { Input, Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Paragraph } = Typography

export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
}

export const defaultQuestionInputProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
}

const QuestionTitle: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = { ...defaultQuestionInputProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default {
  title: '输入框',
  type: 'questionInput',
  Component: QuestionTitle,
  PropsComponent,
  defaultProps: defaultQuestionInputProps,
}
