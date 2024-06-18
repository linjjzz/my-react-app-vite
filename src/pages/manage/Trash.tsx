import React, { FC, useState } from 'react';
import { Typography, Empty, Table, Tag, Space, Button } from 'antd';
import { useTitle } from 'ahooks';

import type { TableProps } from 'antd';
import type { DelListType } from '@/type';
import ListSearch from '@/components/LIstSearch';

const { Title } = Typography

const listData = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    answerCount: 5,
    createAt: '2024-05-21 20:46',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '2024-05-21 20:46',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '2024-05-21 20:46',
  },
  {
    id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '2024-05-21 20:46',
  },
]

const Trash: FC = () => {
  useTitle('问卷星-星标问卷')

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableProps<DelListType>['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (_, { isPublished }) => (
        isPublished ? <Tag color="processing">已发布</Tag>
          : <Tag>未发布</Tag>
      )
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div className="flex h-[60px] justify-between text-[25px]">
        <div>
          <Title level={3}>星标问卷</Title>
        </div>
        <ListSearch />
      </div >
      <div>
        <Space className="mb-[10px]">
          <Button type="primary">恢复</Button>
          <Button danger>彻底删除</Button>
        </Space>
        {listData.length > 0 ?
          <Table columns={columns} dataSource={listData} rowKey={q => q.id} rowSelection={rowSelection} />
          :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
        }
      </div>
    </>
  );
};

export default Trash;
