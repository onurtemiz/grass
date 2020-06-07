import React, { useEffect, useState } from 'react';
import { Segment, Comment as SComment } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { LESSON_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';
const HiddenComment = ({ comment, commentLesson, showTeacher, getDay }) => {
  return (
    <Segment color="blue">
      <SComment.Group>
        <SComment>
          <SComment.Content>
            <SComment.Author>
              <Link to={`/users/${comment.user.username}`}>
                {comment.user.username}
              </Link>
              <SComment.Metadata>
                {comment.likes.length} Pati · {getDay(new Date(comment.date))}
                {!!showTeacher ? ' · ' : null}
                {!!showTeacher ? (
                  <Link
                    to={LESSON_PATH(commentLesson, commentLesson.teacher.name)}
                  >
                    <Label color="green" pointer>
                      {commentLesson.fullName.toUpperCase()}
                    </Label>
                  </Link>
                ) : null}
              </SComment.Metadata>
            </SComment.Author>
            <SComment.Text>
              <Label bold>Bu yorum kuralla uymadığı için kaldırılmıştır.</Label>
            </SComment.Text>
          </SComment.Content>
        </SComment>
      </SComment.Group>
    </Segment>
  );
};

export default HiddenComment;
