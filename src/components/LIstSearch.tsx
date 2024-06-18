import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

const ListSearch: FC = () => {
  const [value, setValue] = useState<string>()

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const curVal = searchParams.get('keyword') || ''
    setValue(curVal)
  }, [searchParams])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSearch = (value: string) => {
    nav({
      pathname,
      search: value === '' ? '' : `keyword=${value}`
    })
  }

  return <Search placeholder="请输入关键词" allowClear value={value} onChange={onChange} onSearch={onSearch} style={{ width: 200 }} />;
};

export default ListSearch;
