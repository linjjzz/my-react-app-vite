import QuestionCard from '@/components/QuestionCard'
import { useRequest, useTitle } from 'ahooks'
import { Divider, List, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ListSearch from '@/components/LIstSearch'
import { SEARCH_KEYWORD } from '@/constant'
import type { ListType } from '@/services/request'
import { getQuestionListService } from '@/services/request'
import { useSearchParams } from 'react-router-dom'

const { Title } = Typography

const MyList = () => {
  useTitle('问卷星-我的问卷')

  const [listData, setListData] = useState<ListType[]>([])
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()

  const { loading, run: getList } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_KEYWORD) || undefined
      const data = await getQuestionListService({ keyword })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list, total } = result ?? { list: [], total: 0 }
        setListData([...listData, ...list])
        setTotal(total)
      },
    },
  )

  useEffect(() => {
    loadMore()
  }, [])

  const loadMore = () => {
    if (loading) return
    getList()
  }

  return (
    <>
      <div className="flex h-[40px] justify-between text-[25px]">
        <Title level={3}>我的问卷</Title>
        <ListSearch />
      </div>
      <InfiniteScroll
        className="mb-[10px]"
        dataLength={listData.length}
        next={loadMore}
        hasMore={listData.length < total}
        loader={
          <Skeleton className="m-0 mt-[10px]" paragraph={{ rows: 1 }} active />
        }
        endMessage={
          <Divider style={{ marginTop: 5 }} plain>
            It is all, nothing more 🤐
          </Divider>
        }
        scrollableTarget="main-content"
      >
        <List
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              style={{ padding: 0, borderBottom: 'none' }}
              key={item.id}
            >
              <QuestionCard {...item} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  )
}

export default MyList
