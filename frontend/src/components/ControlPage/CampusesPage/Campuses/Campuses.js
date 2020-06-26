import React, { useState, useEffect } from 'react';
import campusesService from '../../../../services/campuses';
import CommentsLoading from '../../../Comments/CommentsLoading';
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
        minHeight: '300px',
        maxHeight: '500px',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        useWindow={true}
        loadMore={() => null}
        hasMore={false}
        loader={<CommentsLoading />}
      >
        {campuses.map((c) => (
          <SubCampus key={c.id} campus={c} main />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Campuses;
