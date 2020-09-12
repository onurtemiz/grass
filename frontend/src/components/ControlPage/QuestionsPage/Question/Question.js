import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle, HeadingStyleMobile } from '../../../Nav/NavTheme';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import { getQuestionById } from '../../../../reducers/questionReducer';
import { Divider } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

const Question = () => {
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();
  const match = useRouteMatch('/questions/:id');
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
      {isMobile ? (
        <div style={HeadingStyleMobile}>
          <Label color="blue" bold>
            {question.question}
          </Label>
          <div style={{ marginTop: '0.5em' }}>
            <Follow idToFollow={question.id}  />
          </div>
        </div>
      ) : (
        <div style={HeadingStyle}>
          <Label color="blue" bold>
            {question.question} ·{' '}
            <Follow idToFollow={question.id}  />
          </Label>
        </div>
      )}

      <br />
      <br />
      {question.description}
      <br />
      <CommentForm typeId={question.id} commentType="question" noRecommend />
      <Divider />
      <CommentSort />
      <IdComments typeId={question.id} type="question" />
    </div>
  );
};

export default Question;
