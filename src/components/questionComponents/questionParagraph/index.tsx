import { Typography } from 'antd'
import React, { FC } from 'react'
import PropsComponent from './PropsComponent'

const { Paragraph } = Typography

export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
}

export const defaultQuestionParagraphProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props) => {
  const { text = '', isCenter = false } = {
    ...defaultQuestionParagraphProps,
    ...props,
  }

  const textList = text.split('\n')

  return (
    <div>
      <Paragraph
        style={{
          textAlign: isCenter ? 'center' : 'start',
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
  title: '段落',
  type: 'questionParagraph',
  Component: QuestionParagraph,
  PropsComponent,
  defaultProps: defaultQuestionParagraphProps,
}
