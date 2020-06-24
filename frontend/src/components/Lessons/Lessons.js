import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfLesson } from '../../reducers/lessonReducer';
import SubLesson from '../Teachers/SubLesson';
import CommentsLoading from '../Comments/CommentsLoading';
import Filter from '../Filter/Filter';
import { Divider } from 'semantic-ui-react';
const Lessons = ({ main }) => {
  const count = useSelector((state) => state.lessons.count);
  const start = useSelector((state) => state.lessons.start);
  const hasMore = useSelector((state) => state.lessons.hasMore);
  const lessons = useSelector((state) => state.lessons.lessons);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentLessons, setCurrentLessons] = useState([]);
  useEffect(() => {
    dispatch(addInfLesson(0, count, filter));
  }, [filter]);

  useEffect(() => {
    setCurrentLessons(
      lessons
        .filter((l) => l.name.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => b.name - a.name)
    );
  }, [lessons]);

  const loadFunc = () => {
    dispatch(addInfLesson(start, count, filter));
  };
  const windowStyle = {
    minHeight: '300px',
    maxHeight: '500px',
    overflow: 'auto',
  };
  return (
    <div style={windowStyle}>
      <Filter target="Ders" />
      <Divider />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <CommentsLoading skeletonLength={1} />
          </div>
        }
        useWindow={false}
      >
        {currentLessons.map((l) => (
          <SubLesson key={l.id} lesson={l} main={main} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Lessons;
