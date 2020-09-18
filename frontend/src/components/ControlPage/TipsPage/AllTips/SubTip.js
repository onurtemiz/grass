import React, { useState, useEffect } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { Comment as SComment, Segment, Icon } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import { likeTip } from '../../../../reducers/tipReduer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UserIcon from '../../../UserPage/User/UserIcon';

const SubTip = ({ tip }) => {
  const [likeType, setLikeType] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    tip.likes.includes(user.id) ? setLikeType(true) : setLikeType(false);
  }, []);
  const handleLike = () => {
    dispatch(likeTip(tip.id));
    likeType === false ? setLikeType(true) : setLikeType(false);
  };
  moment.locale('tr');
  return (
    <Segment
      color="blue"
      style={{
        width: '90vw',
        maxWidth: '640px',
      }}
    >
      <SComment.Group>
        <SComment>
          <SComment.Content>
            <SComment.Author>
              <UserName tip={tip} />
              <SComment.Metadata>
                {tip.likesLength} Pati · {moment(new Date(tip.date)).fromNow()}{' '}
              </SComment.Metadata>
            </SComment.Author>
            <SComment.Text>{tip.tip}</SComment.Text>
            <SComment.Actions>
              {user.username !== tip.user && (
                <SComment.Action onClick={handleLike} active={likeType}>
                  <Icon name="paw" color={likeType ? 'blue' : 'green'} />
                  <Label bold pointer color={likeType ? 'blue' : 'green'}>
                    {likeType === true ? 'Patiledin' : 'Patile'}
                  </Label>
                </SComment.Action>
              )}
            </SComment.Actions>
          </SComment.Content>
        </SComment>
      </SComment.Group>
    </Segment>
  );
};

const UserName = ({ tip }) => {
  if (tip.isAnonim) {
    return (
      <Label color="green" bold>
        Boğaziçili
      </Label>
    );
  } else {
    return (
      <>
        <Link to={`/users/${tip.user}`}>
          <Label color="blue" bold pointer>
            {tip.user}
          </Label>
        </Link>
        {tip.userIcon && tip.userIcon.length > 0 && (
          <>
            {' '}
            <UserIcon iconName={tip.userIcon} themeColor="blue" />
          </>
        )}
      </>
    );
  }
};

export default SubTip;
