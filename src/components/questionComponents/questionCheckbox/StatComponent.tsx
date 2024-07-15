import { Column } from '@ant-design/plots'
import React from 'react'
import ReactDOM from 'react-dom'
import { QuestionCheckboxStatPropsType } from '.'

const StatComponent = (props: QuestionCheckboxStatPropsType) => {
  const { stat } = props
  const config = {
    data: stat,
    xField: 'name',
    yField: 'count',
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  }
  return <Column {...config} />
}

export default StatComponent
