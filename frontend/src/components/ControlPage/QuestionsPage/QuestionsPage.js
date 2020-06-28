import React from 'react';
import Questions from './Questions/Questions';
import QuestionsSort from './QuestionsSort/QuestionsSort';
import Filter from '../../Filter/Filter';
import QuestionModal from './Questions/QuestionModal';
import { Divider } from 'semantic-ui-react';

const QuestionsPage = ({ main }) => {
  return (
    <>
      <QuestionsSort />
      <Questions main />
    </>
  );
};

export default QuestionsPage;
