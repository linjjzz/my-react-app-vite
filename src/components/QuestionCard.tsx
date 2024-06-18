import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type PropsType = {
  id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { title, isPublished, createAt, id, isStar, answerCount } = props;
  const nav = useNavigate();

  const duplicate = () => {
    message.success('复制成功');
  };

  const dle = () => {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功');
      },
    });
  };

  return (
    <div className="mt-[10px] bg-white p-[10px]">
      <div className="flex justify-between">
        <div>
          <Link
            to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
            <Space>
              {isStar && <StarOutlined className=" text-red-700" />}
              {title}
            </Space>
          </Link>
        </div>
        <Space>
          {isPublished ? (
            <Tag color="processing">已发布</Tag>
          ) : (
            <Tag>未发布</Tag>
          )}
          <span>答卷：{answerCount}</span>
          <span>{createAt}</span>
        </Space>
      </div>
      <Divider className="my-[20px]" />
      <div className="flex justify-between">
        <Space>
          <Button
            icon={<EditOutlined />}
            type="text"
            size="small"
            onClick={() => nav(`/question/edit/${id}`)}
          >
            编辑问卷
          </Button>
          <Button
            icon={<LineChartOutlined />}
            type="text"
            size="small"
            onClick={() => nav(`/question/stat/${id}`)}
            disabled={!isPublished}
          >
            问卷统计
          </Button>
        </Space>
        <Space>
          <Button type="text" icon={<StarOutlined />} size="small">
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
          >
            <Button type="text" icon={<CopyOutlined />} size="small">
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            onClick={dle}
          >
            删除
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default QuestionCard;
