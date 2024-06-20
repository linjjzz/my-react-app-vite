import React, { FC } from 'react';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';

const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData()
  return <div>Edit: {data?.id}</div>;
};

export default Edit;
