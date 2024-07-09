import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel = () => {
  const [activeKey, setActivekey] = useState(TAB_KEYS.PROP_KEY)

  const { selectedId } = useComponentInfoStore()

  useEffect(() => {
    if (selectedId) setActivekey(TAB_KEYS.PROP_KEY)
    else setActivekey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  const tabsItem = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  return <Tabs activeKey={activeKey} items={tabsItem} />
}

export default RightPanel
