import { editQuestionService } from '@/services/request'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { usePageInfoStore } from '@/store/usePageInfoStore'
import { DownOutlined, LeftOutlined } from '@ant-design/icons'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { Button, Space, Typography, message } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const { Title } = Typography

function EditHeader() {
  const navigator = useNavigate()
  const { pageInfo, resetPageInfo } = usePageInfoStore()
  const { componentList } = useComponentInfoStore()
  const { id = '' } = useParams()

  const { loading: saveLoading, run: saveQuestion } = useRequest(
    async () => {
      if (!id) return
      await editQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true },
  )

  const { loading: publishLoading, run: publishQuestion } = useRequest(
    async () => {
      if (!id) return
      // await editQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true },
  )

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (saveLoading) return
    saveQuestion()
    message.success('保存成功')
  })

  // 自动保存
  useDebounceEffect(
    () => {
      saveQuestion()
    },
    [pageInfo, componentList],
    { wait: 3000 },
  )

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
          <Button
            loading={saveLoading}
            icon={<DownOutlined />}
            onClick={saveQuestion}
          >
            保存
          </Button>
          <Button
            loading={saveLoading}
            type="primary"
            onClick={publishQuestion}
          >
            发布
          </Button>
        </Space>
      </div>
    </>
  )
}

export default EditHeader
