import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { usePageInfoStore } from '@/store/usePageInfoStore'
import { useTitle } from 'ahooks'
import { Button, Layout, Result, Spin } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import StatContent from './StatContent'
import StatHeader from './StatHeader'
import StatLeft from './StatLeft'
import StatRight from './StatRight'

const { Sider, Content } = Layout

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { pageInfo } = usePageInfoStore()
  const { isPublished, title } = pageInfo
  useTitle(`问卷统计-${title}`)

  return isPublished ? (
    <Spin spinning={loading}>
      <Header
        style={{ background: '#fff', padding: '10px 15px' }}
        className="flex items-center justify-between"
      >
        <StatHeader />
      </Header>
      <Layout
        style={{ background: '#F0F2F5' }}
        className="question-content-mh px-[15px] py-[10px]"
      >
        <Sider
          width={350}
          style={{ background: '#fff' }}
          className="rounded p-[10px]"
        >
          <StatLeft />
        </Sider>
        <Content
          style={{ background: '#fff' }}
          className="mx-[15px] flex overflow-auto p-[10px]"
        >
          <StatContent />
        </Content>
        <Sider
          width={350}
          style={{ background: '#fff' }}
          className="rounded p-[10px]"
        >
          <StatRight />
        </Sider>
      </Layout>
    </Spin>
  ) : (
    <div className="flex-1">
      <Result
        status="warning"
        title="该问卷尚未发布."
        extra={
          <Button type="primary" onClick={() => navigate('/manage/list')}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default Stat
