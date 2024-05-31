import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className="mx-[12px] w-[200px] text-center leading-none">
      <Link to="/">
        <Space>
          <Title className="text-[32px] text-[#f7f7f7]">
            <FormOutlined />
          </Title>
          <Title className="text-[32px] text-[#f7f7f7]">问卷星</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
