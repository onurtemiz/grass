import React, { useState, useEffect } from 'react';
import campusesService from '../../services/campuses';
import CommentsLoading from '../Comments/CommentsLoading';
import InfiniteScroll from 'react-infinite-scroller';
import SubCampus from './SubCampus';

const Campuses = ({ main }) => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    campusesService.getAll(setCampuses);
  }, []);
  if (campuses.length === 0) {
    return <CommentsLoading />;
  }

  return (
    <div
      style={{
        // height: '50vh',
        minHeight: '300px',
        maxHeight: '500px',
        // width: '100vw',
        // overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        // loadMore={loadFunc}
        useWindow={true}
        hasMore={false}
        loader={<CommentsLoading />}
      >
        {campuses.map((c) => (
          <SubCampus key={c.id} campus={c} main={main ? true : false} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Campuses;
