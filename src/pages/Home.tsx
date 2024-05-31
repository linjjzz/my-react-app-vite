import { Button, Typography } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();
  return (
    // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
      <div className="text-center">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份, 发布问卷 90 份, 收到答卷 980 份
        </Paragraph>
        <Button
          className="h-[60px] text-[24px]"
          type="primary"
          onClick={() => nav('./manage/list')}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
