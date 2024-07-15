import { QUESTION_EDIT } from '@/router'
import { usePageInfoStore } from '@/store/usePageInfoStore'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  Popover,
  QRCode,
  Space,
  Typography,
  message,
} from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const { Title } = Typography

function StatHeader() {
  const navigator = useNavigate()
  const { pathname } = useLocation()
  const { pageInfo } = usePageInfoStore()
  const { id = '' } = useParams()

  const handleCopy = () => {
    message.success('复制成功')
  }

  return (
    <>
      <div className="flex items-center">
        <Button
          icon={<LeftOutlined />}
          type="link"
          onClick={() => navigator(-1)}
        >
          返回
        </Button>
        <Title style={{ marginBottom: 0 }} level={5}>
          {pageInfo?.title}
        </Title>
      </div>
      <div>
        <Space>
          <Input style={{ width: 350 }} value={pathname} />
          <CopyToClipboard text={pathname} onCopy={handleCopy}>
            <Button icon={<CopyOutlined />} />
          </CopyToClipboard>
          <Popover placement="bottom" content={<QRCode value={pathname} />}>
            <Button icon={<QrcodeOutlined />} />
          </Popover>
        </Space>
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => navigator(`${QUESTION_EDIT}/${id}`)}
        >
          编辑问卷
        </Button>
      </div>
    </>
  )
}

export default StatHeader
