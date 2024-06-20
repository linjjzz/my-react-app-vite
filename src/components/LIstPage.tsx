import React, { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE, SEARCH_PAGE, SEARCH_PAGE_SIZE } from '@/constant';

type propsType = {
  total: number
}

const LIstPage: FC<propsType> = (props) => {
  const { total } = props

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get(SEARCH_PAGE) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(SEARCH_PAGE_SIZE) || '') || PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()

  const onchange = (page: number, pageSize: number) => {
    searchParams.set(SEARCH_PAGE, page.toString())
    searchParams.set(SEARCH_PAGE_SIZE, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  return <div className='p-[10px] flex justify-end'>
    <Pagination current={current} pageSize={pageSize} total={total} onChange={onchange} />
  </div>
};

export default LIstPage;
