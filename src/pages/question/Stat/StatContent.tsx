import { PAGE_SIZE } from '@/constant'
import { getQuestionStatListService } from '@/services/request'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { useRequest } from 'ahooks'
import { Pagination, Spin, Table, Typography } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const { Title } = Typography

const StatContent = () => {
  const { componentList, selectedId, changeSelectedId } =
    useComponentInfoStore()

  const { id = '' } = useParams()

  const [total, setTotal] = useState(0)
  const [list, setList] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  const { loading } = useRequest(
    async () => {
      return await getQuestionStatListService(id, { page: 1, pageSize: 10 })
    },
    {
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
      refreshDeps: [id, page, pageSize],
    },
  )

  const columns = componentList.map((c) => ({
    align: 'center' as 'left' | 'center' | 'right',
    dataIndex: c.fe_id,
    title: (
      <div
        className={classNames(
          'cursor-pointer',
          selectedId === c.fe_id && 'text-[#1890ff]',
        )}
        onClick={() => changeSelectedId(c.fe_id)}
      >
        {c.props?.title ?? c.title}
      </div>
    ),
  }))

  const dataSource = list.map((i: any) => ({ ...i, key: i.id }))

  return (
    <div className="w-full">
      <Spin spinning={loading}>
        <Title level={3}>答卷数量：{total}</Title>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <div className="flex justify-end p-[10px]">
          <Pagination
            total={total}
            pageSize={pageSize}
            current={page}
            onChange={(page) => setPage(page)}
            onShowSizeChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }}
          />
        </div>
      </Spin>
    </div>
  )
}

export default StatContent
