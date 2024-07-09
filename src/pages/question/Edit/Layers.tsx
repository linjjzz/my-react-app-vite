import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Button, Input, List, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import React from 'react'

const Layers = () => {
  const {
    componentList,
    selectedId,
    changeSelectedId,
    editComponentTitle,
    chnageComponentHidden,
    chnageComponentLocked,
  } = useComponentInfoStore()

  return (
    <List
      itemLayout="horizontal"
      dataSource={componentList}
      renderItem={(item) => {
        const { fe_id, title, isHidden, isLocked } = item
        return (
          <List.Item
            key={fe_id}
            className="cursor-pointer"
            onClickCapture={() => changeSelectedId(fe_id)}
          >
            <div className="flex w-full items-center justify-between">
              <Input
                className={classNames(
                  'mr-[20px]',
                  fe_id === selectedId
                    ? 'border-[#1890ff] text-[#1890ff]'
                    : 'text-[#999]',
                )}
                variant="filled"
                value={title}
                onChange={(e) => editComponentTitle(e.target.value)}
              />
              <Space>
                <Tooltip title={isHidden ? '显示' : '隐藏'} placement="bottom">
                  <Button
                    size="small"
                    shape="circle"
                    type={isHidden ? 'primary' : 'default'}
                    icon={isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      chnageComponentHidden(false)
                    }}
                  />
                </Tooltip>
                <Tooltip title={isLocked ? '解锁' : '锁定'} placement="bottom">
                  <Button
                    size="small"
                    shape="circle"
                    type={isLocked ? 'primary' : 'default'}
                    icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      chnageComponentLocked()
                    }}
                  />
                </Tooltip>
              </Space>
            </div>
          </List.Item>
        )
      }}
    />
  )
}

export default Layers
