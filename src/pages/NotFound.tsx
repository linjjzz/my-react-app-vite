import { Button, Result } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉, 您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav('/manage/list')}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
