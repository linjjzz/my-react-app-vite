import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UnlockOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'

function EditToolbar() {
  const {
    removeComponent,
    chnageComponentHidden,
    chnageComponentLocked,
    componentList,
    selectedId,
    copyComponent,
    copiedComponent,
    pasteComponent,
    moveComponentPosition,
  } = useComponentInfoStore()

  const { undo, redo, pastStates, futureStates } = useComponentInfoStore.temporal.getState()

  const [isLocked, setIsLocked] = useState(
    componentList.find((c) => c.fe_id === selectedId)?.isLocked,
  )

  const length = componentList.length
  const selectIndex = componentList.findIndex((c) => c.fe_id === selectedId)
  const isFirst = selectIndex <= 0
  const isLast = selectIndex + 1 >= length

  useEffect(() => {
    const isLocked = componentList.find((c) => c.fe_id === selectedId)?.isLocked
    setIsLocked(isLocked)
  }, [selectedId, componentList])

  const handleDel = () => {
    removeComponent()
  }

  const handleHidden = () => {
    chnageComponentHidden()
  }

  const handleLocked = () => {
    chnageComponentLocked()
  }

  const handleCopy = () => {
    copyComponent()
    message.success('复制成功')
  }

  const handlePaste = () => {
    pasteComponent()
  }

  const handleMoveUp = () => {
    if (isFirst) return
    moveComponentPosition(selectIndex, selectIndex - 1)
  }

  const handleMoveDown = () => {
    if (isLast) return
    moveComponentPosition(selectIndex, selectIndex + 1)
  }

  const handleRedo = () => {
    redo()
  }

  const handleUndo = () => {
    undo()
  }

  return (
    <div>
      {/* {selectedId !== '' && ( */}
      <Space>
        <Tooltip title="删除" placement="bottom">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDel}
            disabled={selectedId === ''}
          />
        </Tooltip>
        <Tooltip title="隐藏" placement="bottom">
          <Button
            shape="circle"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHidden}
            disabled={selectedId === ''}
          />
        </Tooltip>
        <Tooltip title={isLocked ? '解锁' : '锁定'} placement="bottom">
          <Button
            type={isLocked ? 'primary' : 'default'}
            shape="circle"
            icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
            onClick={handleLocked}
            disabled={selectedId === ''}
          />
        </Tooltip>
        <Tooltip title="复制" placement="bottom">
          <Button
            shape="circle"
            icon={<CopyOutlined />}
            onClick={handleCopy}
            disabled={selectedId === ''}
          />
        </Tooltip>
        <Tooltip title="粘贴" placement="bottom">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={handlePaste}
            disabled={!copiedComponent}
          />
        </Tooltip>
        <Tooltip title="上移" placement="bottom">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={handleMoveUp}
            disabled={selectedId === '' || isFirst}
          />
        </Tooltip>
        <Tooltip title="下移" placement="bottom">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={handleMoveDown}
            disabled={selectedId === '' || isLast}
          />
        </Tooltip>
        <Tooltip title="重做" placement="bottom">
          <Button
            shape="circle"
            icon={<RedoOutlined />}
            onClick={handleRedo}
            disabled={futureStates.length === 0}
          />
        </Tooltip>
        <Tooltip title="撤销" placement="bottom">
          <Button
            shape="circle"
            icon={<UndoOutlined />}
            onClick={handleUndo}
            disabled={pastStates.length === 0}
          />
        </Tooltip>
      </Space>
      {/* )} */}
    </div>
  )
}

export default EditToolbar
