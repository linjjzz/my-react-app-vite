import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default QuestionLayout
