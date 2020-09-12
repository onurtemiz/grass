import React, { useState, useEffect } from 'react';
import campusesService from '../../../../services/campuses';
import CommentsLoading from '../../../Comments/CommentsLoading';
import InfiniteScroll from 'react-infinite-scroller';
import SubCampus from './SubCampus';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const Campuses = ({ main }) => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    campusesService.getAll(setCampuses);
  }, []);
  if (campuses.length === 0) {
    return <CommentsLoading />;
  }
  return (
    <div style={InfiniteListStyle}>
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
