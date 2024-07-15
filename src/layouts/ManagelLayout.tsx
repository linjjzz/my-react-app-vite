import { MANAGE_LIST, MANAGE_STAR, MANAGE_TRASH, QUESTION_EDIT } from '@/router'
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
  const navigator = useNavigate()
  const { pathname } = useLocation()

  const {
    loading,
    error,
    run: create,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      const { id = '' } = result
      navigator(`${QUESTION_EDIT}/${id}`)
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
            type={pathname.startsWith(MANAGE_LIST) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigator(MANAGE_LIST)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_STAR) ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigator(MANAGE_STAR)}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_TRASH) ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigator(MANAGE_TRASH)}
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
