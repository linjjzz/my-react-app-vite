import { usePageInfoStore } from '@/store/usePageInfoStore'
import { DownOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const { Title } = Typography

function EditHeader() {
  const navigator = useNavigate()
  const { pageInfo, resetPageInfo } = usePageInfoStore()

  const editTitle = (title: string) => {
    resetPageInfo({ ...pageInfo, title })
  }

  return (
    <>
      <div className="flex items-center">
        <Button
          icon={<LeftOutlined />}
          type="link"
          onClick={() => navigator(-1)}
        >
          返回
        </Button>
        <Title
          style={{ marginBottom: 0 }}
          editable={{ onChange: editTitle }}
          level={5}
        >
          {pageInfo?.title}
        </Title>
      </div>
      <div>
        <EditToolbar />
      </div>
      <div>
        <Space>
          <Button icon={<DownOutlined />}>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </>
  )
}

export default EditHeader
