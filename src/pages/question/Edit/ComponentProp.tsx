import { getComponentConfByType } from '@/components/questionComponents'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import React from 'react'

const ComponentProp = () => {
  const { componentList, selectedId } = useComponentInfoStore()

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)
  if (selectedComponent == null) return <div>未选中组件</div>

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <div>未选中组件</div>

  const { PropsComponent } = componentConf
  return <PropsComponent {...props} />
}

export default ComponentProp
