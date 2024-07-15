import { getComponentConfByType } from '@/components/questionComponents'
import { getComponentStatService } from '@/services/request'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Column, Pie } from '@ant-design/plots'
import { useRequest } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StatRight = () => {
  const { componentList, selectedId } = useComponentInfoStore()
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    },
  )

  const componentType = componentList.find((c) => c.fe_id === selectedId)
    ?.type as string

  useEffect(() => {
    if (selectedId) run(id, selectedId)
  }, [id, selectedId])

  const genStat = () => {
    if (!selectedId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfByType(componentType) || {}
    return StatComponent ? (
      <StatComponent stat={stat} />
    ) : (
      <div>该组件无统计图表</div>
    )
  }

  return <div>{genStat()}</div>
}

export default StatRight
