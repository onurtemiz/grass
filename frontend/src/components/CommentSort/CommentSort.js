import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { sortComment } from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import { GreenLabel } from '../Nav/NavTheme';

const CommentSort = () => {
  const filter = useSelector((state) => state.comments.filter);
  const dispatch = useDispatch();
  const [active, setActive] = useState(filter);

  useEffect(() => {
    dispatch(sortComment(active));
  }, [active]);

  return (
    <Menu style={{ marginBottom: '0' }} pointing secondary color="green">
      <Menu.Item
        active={active === 'mostRecent'}
        onClick={() => setActive('mostRecent')}
        header
      >
        <Icon name="fire" color="green" />
        <GreenLabel>En Yeni</GreenLabel>
      </Menu.Item>
      <Menu.Item
        active={active === 'mostPast'}
        onClick={() => setActive('mostPast')}
        header
      >
        <Icon name="time" color="green" />
        <GreenLabel>En Eski</GreenLabel>
      </Menu.Item>
      <Menu.Item
        active={active === 'mostPopular'}
        onClick={() => setActive('mostPopular')}
        header
      >
        <Icon name="paw" color="green" />
        <GreenLabel>En Patili</GreenLabel>
      </Menu.Item>
    </Menu>
  );
};

export default CommentSort;
