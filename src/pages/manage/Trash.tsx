import React, { FC, useState } from 'react';
import { Typography, Table, Tag, Space, Button } from 'antd';
import { useTitle } from 'ahooks';

import type { TableProps } from 'antd';
import type { ListType } from '@/services/request';
import ListSearch from '@/components/LIstSearch';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import LIstPage from '@/components/LIstPage';

const { Title } = Typography

const Trash: FC = () => {
  useTitle('问卷星-回收站')

  const { data, loading, error } = useLoadQuestionListData({ isDeleted: true })
  const { list, total } = data ?? { list: [], total: 0 };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableProps<ListType>['columns'] = [
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
      <div className="flex h-[40px] justify-between text-[25px]">
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
        <Table loading={loading} columns={columns} dataSource={list} rowKey={q => q.id} rowSelection={rowSelection} pagination={false} />
        {list.length > 0 && <LIstPage total={total} />}
      </div >
    </>
  );
};

export default Trash;
