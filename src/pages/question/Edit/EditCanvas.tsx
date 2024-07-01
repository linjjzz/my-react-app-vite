import { getComponentConfByType } from '@/components/questionComponents'
import {
  ComponentInfoType,
  useComponentInfoStore,
} from '@/store/useComponentInfoStore'
import { useKeyPress } from 'ahooks'
import { message } from 'antd'
import classNames from 'classnames'
import React from 'react'

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const isActiveElementValid = () => {
  if (document.activeElement === document.body) return true
  return false
}

const EditCanvas = () => {
  const {
    componentList,
    selectedId,
    changeSelectedId,
    copyComponent,
    pasteComponent,
    removeComponent,
    selectPreComponent,
    selectNextComponent,
  } = useComponentInfoStore()

  useKeyPress(['ctrl.c'], () => {
    if (!isActiveElementValid()) return
    copyComponent()
    message.success('复制成功')
  })

  useKeyPress(['ctrl.v'], () => {
    if (!isActiveElementValid()) return
    pasteComponent()
  })

  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    removeComponent()
  })

  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    selectPreComponent()
  })

  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    selectNextComponent()
  })

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation()
    changeSelectedId(id)
  }

  return (
    <div className="min-h-[100%] overflow-hidden bg-white">
      {componentList
        .filter((c) => !c.isHidden)
        .map((item) => {
          const { fe_id, isLocked } = item
          return (
            <div
              key={fe_id}
              onClick={(e) => handleClick(e, fe_id)}
              className={classNames(
                'm-[12px] rounded-[3px] border border-[#fff] p-[12px] hover:border-[#d9d9d9]',
                selectedId == fe_id && '!border-[#1890ff]',
              )}
            >
              <div
                className={classNames(
                  'pointer-events-none',
                  isLocked ? 'opacity-50' : '',
                )}
              >
                {genComponent(item)}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
