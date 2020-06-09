import React, { useEffect, useState } from 'react';
import { Segment, Comment as SComment } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { LESSON_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';
import { LessonType, ClubType } from './SubComment';
const HiddenComment = ({ comment, showSource }) => {
  return (
    <Segment color="blue">
      <SComment.Group>
        <SComment>
          <SComment.Content>
            <LessonType comment={comment} showSource={showSource} />
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
