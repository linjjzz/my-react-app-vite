import { Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Title, Paragraph } = Typography

export type QuestionInfoPropsType = {
  title?: string
  text?: string
}

export const defaultQuestionInfoProps: QuestionInfoPropsType = {
  title: '一行标题',
  text: '一行段落',
}

const QuestionInfo: FC<QuestionInfoPropsType> = (props) => {
  const { title = '', text = '' } = { ...defaultQuestionInfoProps, ...props }

  const textList = text.split('\n')

  return (
    <div>
      <Title
        style={{
          textAlign: 'center',
          marginBottom: 0,
          fontSize: '24px',
        }}
      >
        {title}
      </Title>
      <Paragraph
        style={{
          textAlign: 'center',
          marginBottom: 0,
        }}
      >
        {textList.map((text, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {text}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default {
  title: '标题段落',
  type: 'questionInfo',
  Component: QuestionInfo,
  PropsComponent,
  defaultProps: defaultQuestionInfoProps,
}
