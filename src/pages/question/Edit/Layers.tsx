import SortableContainer from '@/components/dragSortable/SortableContainer'
import SortableItem from '@/components/dragSortable/SortableItem'
import {
  ComponentInfoType,
  useComponentInfoStore,
} from '@/store/useComponentInfoStore'
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Button, Input, List, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

const Layers = () => {
  const {
    componentList,
    selectedId,
    changeSelectedId,
    editComponentTitle,
    chnageComponentHidden,
    chnageComponentLocked,
    moveComponentPosition,
  } = useComponentInfoStore()

  const componentListWithId = componentList.map((c) => ({ ...c, id: c.fe_id }))

  const onDragEnd = (oldIndex: number, newIndex: number) => {
    moveComponentPosition(oldIndex, newIndex)
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={onDragEnd}>
      <List itemLayout="horizontal">
        {componentListWithId.map((item) => {
          const { fe_id, title, isHidden, isLocked } = item
          return (
            <SortableItem key={fe_id} id={fe_id}>
              <List.Item
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
                    <Tooltip
                      title={isHidden ? '显示' : '隐藏'}
                      placement="bottom"
                    >
                      <Button
                        size="small"
                        shape="circle"
                        type={isHidden ? 'primary' : 'default'}
                        icon={
                          isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        onClick={(e) => {
                          e.stopPropagation() // 阻止事件冒泡
                          chnageComponentHidden(false)
                        }}
                      />
                    </Tooltip>
                    <Tooltip
                      title={isLocked ? '解锁' : '锁定'}
                      placement="bottom"
                    >
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
            </SortableItem>
          )
        })}
      </List>
    </SortableContainer>
  )
}

export default Layers
