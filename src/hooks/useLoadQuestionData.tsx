import { getQuestionService } from '@/services/request'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { useRequest } from 'ahooks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function useLoadQuestionData() {
  const { id = '' } = useParams()

  const { resetComponentInfo } = useComponentInfoStore()

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    { manual: true },
  )

  useEffect(() => {
    run(id)
  }, [id])

  useEffect(() => {
    if (!id) return
    const { title, componentList } = data ?? { title: '', componentList: [] }
    resetComponentInfo(componentList)
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
