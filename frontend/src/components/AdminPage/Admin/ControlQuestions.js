import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import questionsService from '../../../services/questions';
import QuestionAdmin from './QuestionAdmin';
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
