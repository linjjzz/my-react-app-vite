import QuestionCard from '@/components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import React, { FC } from 'react'

import LIstPage from '@/components/LIstPage'
import ListSearch from '@/components/LIstSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷星-星标问卷')

  const { data, loading, error } = useLoadQuestionListData({ isStar: true })
  const { list, total } = data ?? { list: [], total: 0 }
  return (
    <>
      <div className="flex h-[40px] justify-between text-[25px]">
        <Title level={3}>星标问卷</Title>
        <ListSearch />
      </div>
      <Spin spinning={loading}>
        {list.length > 0 ? (
          <>
            {list.map((item) => (
              <QuestionCard key={item.id} {...item} />
            ))}
            <LIstPage total={total} />
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
        )}
      </Spin>
    </>
  )
}

export default Star
