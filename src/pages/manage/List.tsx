import React, { FC, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';

const List: FC = () => {
  const [questionList, steQuestionList] = useState([
    {
      id: 'q1',
      title: '问卷1',
      isPublished: false,
      isStar: false,
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
  ]);
  return (
    <>
      <div className="flex h-[60px] justify-between text-[25px]">
        <div>
          <div>我的问卷</div>
        </div>
        <div> （搜索） </div>
      </div>
      <div>
        {questionList.length > 0 &&
          questionList.map((item) => <QuestionCard key={item.id} {...item} />)}
      </div>
      <div>list page footer</div>
    </>
  );
};

export default List;
