import React from 'react';
import { Menu } from 'semantic-ui-react';
import { sortComment } from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';

const CommentSort = () => {
  const filter = useSelector((state) => state.comments.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <Menu text>
        <Menu.Item
          name="En Yeni"
          active={filter === 'mostRecent'}
          onClick={() => dispatch(sortComment('mostRecent'))}
        />
        <Menu.Item
          name="En Eski"
          active={filter === 'mostPast'}
          onClick={() => dispatch(sortComment('mostPast'))}
        />
        <Menu.Item
          name="En Patili"
          active={filter === 'mostPopular'}
          onClick={() => dispatch(sortComment('mostPopular'))}
        />
      </Menu>
    </div>
  );
};

export default CommentSort;
