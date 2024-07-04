import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React from 'react'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel = () => {
  const tabsItem = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabsItem} />
}

export default LeftPanel
