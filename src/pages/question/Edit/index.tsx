import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { usePageInfoStore } from '@/store/usePageInfoStore'
import { useTitle } from 'ahooks'
import { Layout, Spin } from 'antd'
import React, { FC } from 'react'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const { Header, Sider, Content } = Layout

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { changeSelectedId } = useComponentInfoStore()
  const { pageInfo } = usePageInfoStore()
  const { title } = pageInfo
  useTitle(`问卷统计-${title}`)

  const clearSelectedId = () => {
    changeSelectedId('')
  }
  return (
    <Spin spinning={loading}>
      <Header
        style={{ background: '#fff', padding: '10px 15px' }}
        className="flex items-center justify-between"
      >
        <EditHeader />
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
          <LeftPanel />
        </Sider>
        <Content
          className="flex items-center justify-center overflow-hidden"
          onClick={clearSelectedId}
        >
          <div className="h-[732px] w-[400px] overflow-auto">
            <EditCanvas />
          </div>
        </Content>
        <Sider
          width={350}
          style={{ background: '#fff' }}
          className="rounded p-[10px]"
        >
          <RightPanel />
        </Sider>
      </Layout>
    </Spin>
  )
}

export default Edit
