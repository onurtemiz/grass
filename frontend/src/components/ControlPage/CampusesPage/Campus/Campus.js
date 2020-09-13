import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle, HeadingStyleMobile } from '../../../Nav/NavTheme';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import campusService from '../../../../services/campuses';
import { isMobile } from 'react-device-detect';

const Campus = () => {
  const match = useRouteMatch('/campuses/:name');
  const [campus, setCampus] = useState(null);
  useEffect(() => {
    campusService.getCampusByName(match.params.name, setCampus);
  }, []);

  if (campus === null) {
    return <LinearProgress />;
  }
  return (
    <div>
      {isMobile ? (
        <div style={HeadingStyleMobile}>
          <Label color="blue" bold>
            {campus.name}
          </Label>
          <div style={{ marginTop: '0.5em' }}>
            <Follow idToFollow={campus.id} />
          </div>
        </div>
      ) : (
        <div style={HeadingStyle}>
          <Label color="blue" bold style={{ marginRight: '0.5em' }}>
            {campus.name}
          </Label>
          <Follow idToFollow={campus.id} />
        </div>
      )}

      <br />
      <CommentForm typeId={campus.id} commentType="campus" />
      <Divider />
      <CommentSort />
      <IdComments typeId={campus.id} type="campus" />
    </div>
  );
};

export default Campus;
