import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className="w-[200px] text-center leading-none">
      <Link to="/">
        <Space>
          <FormOutlined className="text-[#f7f7f7]" />
          <div className="text-[#f7f7f7]">问卷星</div>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
