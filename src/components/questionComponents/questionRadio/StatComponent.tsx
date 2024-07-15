import { Pie } from '@ant-design/plots'
import React from 'react'
import ReactDOM from 'react-dom'
import { QuestionRadioStatPropsType } from '.'

const StatComponent = (props: QuestionRadioStatPropsType) => {
  const { stat } = props
  const config = {
    data: stat,
    angleField: 'count',
    colorField: 'name',
    label: {
      text: 'count',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  }
  return <Pie {...config} />
}

export default StatComponent
