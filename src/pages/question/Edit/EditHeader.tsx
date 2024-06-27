import { DownOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

function EditHeader() {
  const navigator = useNavigate()
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
        <span className="mr-[15px] font-bold">Title</span>
        <EditOutlined />
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
