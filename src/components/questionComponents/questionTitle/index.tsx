import { Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Title } = Typography

export type QuestionTitlePropsType = {
  title?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
}

export const defaultQuestionTitleProps: QuestionTitlePropsType = {
  title: '一行标题',
  level: 1,
  isCenter: false,
}

const genFontSize = (level: number) => {
  switch (level) {
    case 1:
      return '24px'
    case 2:
      return '20px'
    case 3:
      return '16px'
    default:
      return '16px'
  }
}

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const {
    title = '',
    level = 1,
    isCenter = false,
  } = { ...defaultQuestionTitleProps, ...props }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: 0,
          fontSize: genFontSize(level),
        }}
      >
        {title}
      </Title>
    </div>
  )
}

export default {
  title: '标题',
  type: 'questionTitle',
  Component: QuestionTitle,
  PropsComponent,
  defaultProps: defaultQuestionTitleProps,
}
