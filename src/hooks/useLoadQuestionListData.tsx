import {
  PAGE_SIZE,
  SEARCH_KEYWORD,
  SEARCH_PAGE,
  SEARCH_PAGE_SIZE,
} from '@/constant'
import { getQuestionListService } from '@/services/request'
import { useRequest } from 'ahooks'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

type optionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<optionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const { loading, data, error } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_KEYWORD) || undefined
      const page = parseInt(searchParams.get(SEARCH_PAGE) || '') || 1
      const pageSize =
        parseInt(searchParams.get(SEARCH_PAGE_SIZE) || '') || PAGE_SIZE
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      })
      return data
    },
    {
      refreshDeps: [searchParams],
    },
  )
  return { loading, data, error }
}

export default useLoadQuestionListData
