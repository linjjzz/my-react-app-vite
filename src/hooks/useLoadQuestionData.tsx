import React from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/request'
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const { loading, data, error } = useRequest(async () => {
    const data = await getQuestionService(id)
    return data
  })
  return { loading, data, error }
}

export default useLoadQuestionData