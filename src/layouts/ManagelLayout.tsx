import { createQuestionService } from '@/services/request'
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Divider, Space } from 'antd'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const ManagelLayout: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const {
    loading,
    error,
    run: create,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      const { id = '' } = result
      navigate(`/question/edit/${id}`)
    },
  })

  return (
    <div className="m-auto flex w-[1200px] pt-[24px]">
      <div className="w-[120px]">
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={create}
          >
            新建问卷
          </Button>
          <Divider className="border-t-transparent" />

          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="ml-[60px] flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default ManagelLayout
