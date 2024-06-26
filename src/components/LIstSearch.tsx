import { SEARCH_KEYWORD } from '@/constant'
import { Input } from 'antd'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState<string>()

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const curVal = searchParams.get(SEARCH_KEYWORD) || undefined
    setValue(curVal)
  }, [searchParams])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSearch = (value: string) => {
    nav({
      pathname,
      search: value === '' ? '' : `${SEARCH_KEYWORD}=${value}`,
    })
  }

  return (
    <Search
      placeholder="请输入关键词"
      allowClear
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  )
}

export default ListSearch
