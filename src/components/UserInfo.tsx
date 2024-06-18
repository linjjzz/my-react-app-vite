import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const UserInfo: FC = () => {
  return (
    <Link to="/login" className="text-[16px] text-[#f7f7f7]">登录</Link>
  );
};

export default UserInfo;
