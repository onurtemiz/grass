import React, { useState, useEffect } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import questionsService from '../../services/questions';
import Report from './Report';
import QuestionAdmin from './QuestionAdmin';
import Filter from '../Filter/Filter';
const ControlQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions();
  }, []);
  const getAllQuestions = async () => {
    const allQuestions = await questionsService.getAllQuestions();
    setQuestions(allQuestions);
  };
  if (questions.length === 0) {
    return null;
  }
  console.log('questions', questions);
  return (
    <div
      style={{
        height: '400px',
        overflow: 'auto',
      }}
    >
      <Card.Group>
        {questions.map((q) => {
          return <QuestionAdmin question={q} key={q.id} />;
        })}
      </Card.Group>
    </div>
  );
};

export default ControlQuestions;
