import { Layout } from 'antd';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <>
      <Layout>
        <Header className="py-[12px] flex justify-between items-center text-[32px]">
          <Logo />
          <UserInfo />
        </Header>
        <Content id='main-content' className="main-content-mh bg-slate-200 overflow-auto">
          <Outlet />
        </Content>
        <Footer className="text-center">
          问卷星 &copy;2024 - present. Created by JayLin
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
