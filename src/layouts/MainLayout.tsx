import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className="flex items-center justify-between py-[12px] text-[32px]">
        <Logo />
        <UserInfo />
      </Header>
      <Content
        id="main-content"
        className="main-content-mh overflow-auto bg-[#EEF0F4]"
      >
        <Outlet />
      </Content>
      <Footer className="text-center">
        问卷星 &copy;2024 - present. Created by JayLin
      </Footer>
    </Layout>
  )
}

export default MainLayout
