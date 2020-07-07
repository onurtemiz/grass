import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle } from '../../../Nav/NavTheme';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import campusService from '../../../../services/campuses';

const Campus = () => {
  const match = useRouteMatch('/campuses/:name');
  const user = useSelector((state) => state.user);
  const [campus, setCampus] = useState(null);
  useEffect(() => {
    campusService.getCampusByName(match.params.name, setCampus);
  }, []);

  if (campus === null) {
    return <LinearProgress />;
  }
  return (
    <div>
      <Label color="blue" bold style={HeadingStyle}>
        {campus.name} · <Follow idToFollow={campus.id} user={user} />
      </Label>
      <br />
      <br />
      <CommentForm typeId={campus.id} commentType="campus" />
      <Divider />
      <CommentSort />
      <IdComments typeId={campus.id} type="campus" />
    </div>
  );
};

export default Campus;
