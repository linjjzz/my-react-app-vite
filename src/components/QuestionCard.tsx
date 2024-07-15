import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { QUESTION_EDIT, QUESTION_STAT } from '@/router'
import {
  ListType,
  duplicateQuestionService,
  editQuestionService,
} from '@/services/request'
import { useRequest } from 'ahooks'

const { confirm } = Modal

const QuestionCard = (props: ListType) => {
  const { title, isPublished, createAt, id, isStar, answerCount } = props
  const navigator = useNavigate()
  const [isStarState, setIsStarState] = useState(isStar)

  const { loading: isStarChnageLoading, run: isStarOnChnage } = useRequest(
    async () => {
      const data = await editQuestionService(id, { isStar: !isStarState })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('更新完成')
      },
    },
  )

  const { loading: dleLoading, run: dleRun } = useRequest(
    async () => {
      const data = await editQuestionService(id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
      },
    },
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(id)
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('复制成功')
      },
    },
  )

  const dle = () => {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: dleRun,
    })
  }

  return (
    <div className="mt-[10px] w-full bg-white p-[10px]">
      <div className="flex justify-between">
        <div>
          <Link
            to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
            <Space>
              {isStarState && <StarOutlined className=" text-red-700" />}
              {title}
            </Space>
          </Link>
        </div>
        <Space>
          {isPublished ? (
            <Tag color="processing">已发布</Tag>
          ) : (
            <Tag>未发布</Tag>
          )}
          <span>答卷：{answerCount}</span>
          <span>{createAt}</span>
        </Space>
      </div>
      <Divider className="my-[20px]" />
      <div className="flex justify-between">
        <Space>
          <Button
            icon={<EditOutlined />}
            type="text"
            size="small"
            onClick={() => navigator(`${QUESTION_EDIT}/${id}`)}
          >
            编辑问卷
          </Button>
          <Button
            icon={<LineChartOutlined />}
            type="text"
            size="small"
            onClick={() => navigator(`${QUESTION_STAT}/${id}`)}
            disabled={!isPublished}
          >
            问卷统计
          </Button>
        </Space>
        <Space>
          <Button
            type="text"
            icon={<StarOutlined />}
            size="small"
            onClick={isStarOnChnage}
            disabled={isStarChnageLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
            disabled={duplicateLoading}
          >
            <Button type="text" icon={<CopyOutlined />} size="small">
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            onClick={dle}
            disabled={dleLoading}
          >
            删除
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default QuestionCard
