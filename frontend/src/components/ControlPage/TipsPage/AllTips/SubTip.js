import React, { useState, useEffect } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { Comment as SComment, Segment } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';

const SubTip = ({ tip }) => {
  return (
    <Segment
      color="blue"
      style={{
        width: '50vw',
        marginLeft: '1rem',
        marginTop: '1rem',
      }}
    >
      <SComment.Group>
        <SComment>
          <SComment.Content>
            <SComment.Author></SComment.Author>

            <SComment.Text>
              <Label color="green" style={{ fontWeight: 'bold' }}>
                {tip.isAnonim ? 'Boğaziçili:' : `${tip.user}:`}
              </Label>{' '}
              {tip.tip}
            </SComment.Text>
          </SComment.Content>
        </SComment>
      </SComment.Group>
    </Segment>
  );
};

export default SubTip;
