import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '@/services/request';

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService)
  const { nickname } = data || {}

  return (
    <>
      {nickname ?
        <Space className="text-[16px] text-[#f7f7f7]">
          {nickname}
          <LogoutOutlined />
        </Space> :
        <Link to="/login" className="text-[16px] text-[#f7f7f7]">
          登录
        </Link>}
    </>
  );
};

export default UserInfo;
