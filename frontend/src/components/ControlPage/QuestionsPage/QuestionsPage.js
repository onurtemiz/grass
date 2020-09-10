import React from 'react';
import Questions from './Questions/Questions';
import QuestionsSort from './QuestionsSort/QuestionsSort';

const QuestionsPage = ({ main }) => {
  return (
    <>
      <QuestionsSort />
      <Questions main />
    </>
  );
};

export default QuestionsPage;
