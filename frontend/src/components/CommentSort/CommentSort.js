import React, { useState, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import { sortComment } from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';

const CommentSort = () => {
  const filter = useSelector((state) => state.comments.filter);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, []);
  const getActiveIndex = () => {
    switch (filter) {
      case 'mostRecent':
        return 0;
      case 'mostPast':
        return 1;
      case 'mostPopular':
        return 2;
      default:
        return 0;
    }
  };

  const getFilterByIndex = (index) => {
    switch (index) {
      case 0:
        return 'mostRecent';
      case 1:
        return 'mostPast';
      case 2:
        return 'mostPopular';
      default:
        return 0;
    }
  };

  const handleTabChange = (d) => {
    setActiveIndex(d.activeIndex);
    const currentFilter = getFilterByIndex(d.activeIndex);
    dispatch(sortComment(currentFilter));
  };

  const panes = [
    {
      menuItem: 'En Yeni',
    },
    {
      menuItem: 'En Eski',
    },
    {
      menuItem: 'En Patili',
    },
  ];
  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      activeIndex={activeIndex}
      onTabChange={(e, d) => handleTabChange(d)}
    />
  );
};

export default CommentSort;
