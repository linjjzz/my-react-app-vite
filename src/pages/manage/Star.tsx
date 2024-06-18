import React, { FC, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import { Typography, Empty } from 'antd';
import { useTitle } from 'ahooks';

import type { ListType } from '@/type';
import ListSearch from '@/components/LIstSearch';

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷星-星标问卷')

  const [questionList, steQuestionList] = useState<ListType[] | []>([
    // {
    //   id: 'q1',
    //   title: '问卷1',
    //   isPublished: false,
    //   isStar: true,
    //   answerCount: 5,
    //   createAt: '2024-05-21 20:46',
    // },
    // {
    //   id: 'q2',
    //   title: '问卷2',
    //   isPublished: true,
    //   isStar: true,
    //   answerCount: 5,
    //   createAt: '2024-05-21 20:46',
    // },
    // {
    //   id: 'q3',
    //   title: '问卷3',
    //   isPublished: false,
    //   isStar: true,
    //   answerCount: 5,
    //   createAt: '2024-05-21 20:46',
    // },
  ]);
  return (
    <>
      <div className="flex h-[60px] justify-between text-[25px]">
        <div>
          <Title level={3}>星标问卷</Title>
        </div>
        <ListSearch />
      </div >
      <div>
        {questionList.length > 0 ?
          <>
            {questionList.map((item) => <QuestionCard key={item.id} {...item} />)}
            <div>分页</div>
          </>
          :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
        }
      </div>
    </>
  );
};

export default Star;
