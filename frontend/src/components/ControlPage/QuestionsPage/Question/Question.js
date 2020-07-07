import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label } from '../../../Nav/NavTheme';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import { getQuestionById } from '../../../../reducers/questionReducer';
import { Divider } from 'semantic-ui-react';

const Question = () => {
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();
  const match = useRouteMatch('/questions/:id');
  const user = useSelector((state) => state.user);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    dispatch(getQuestionById(match.params.id));
  }, []);

  useEffect(() => {
    const q = questions.find((q) => q.id === match.params.id);
    if (q) {
      setQuestion(q);
    }
  }, [questions]);

  if (question === null) {
    return <LinearProgress />;
  }
  return (
    <div>
      <Label
        color="blue"
        bold
        style={{
          fontSize: '2em',
          display: 'flex',
          whiteSpace: 'pre-wrap',
          alignItems: 'center',
        }}
      >
        {question.question} · <Follow idToFollow={question.id} user={user} />
      </Label>
      <br />
      <br />
      {question.description}
      <br />
      <CommentForm typeId={question.id} commentType="question" />
      <Divider />
      <CommentSort />
      <IdComments typeId={question.id} type="question" />
    </div>
  );
};

export default Question;
