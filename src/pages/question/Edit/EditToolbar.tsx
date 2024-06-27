import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
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
    pasteComponent
  } = useComponentInfoStore()

  const [isLocked, setIsLocked] = useState(
    componentList.find((c) => c.fe_id === selectedId)?.isLocked,
  )

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

  return (
    <div>
      {selectedId !== '' && (
        <Space>
          <Tooltip title="删除" placement="bottom">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={handleDel}
            />
          </Tooltip>
          <Tooltip title="隐藏" placement="bottom">
            <Button
              shape="circle"
              icon={<EyeInvisibleOutlined />}
              onClick={handleHidden}
            />
          </Tooltip>
          <Tooltip title={isLocked ? '解锁' : '锁定'} placement="bottom">
            <Button
              type={isLocked ? 'primary' : 'default'}
              shape="circle"
              icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
              onClick={handleLocked}
            />
          </Tooltip>
          <Tooltip title="复制" placement="bottom">
            <Button
              shape="circle"
              icon={<CopyOutlined />}
              onClick={handleCopy}
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
        </Space>
      )}
    </div>
  )
}

export default EditToolbar
