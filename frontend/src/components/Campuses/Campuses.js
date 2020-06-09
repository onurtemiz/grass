import React, { useState, useEffect } from 'react';
import campusesService from '../../services/campuses';
import { Loading } from '../Comments/Comments';
import InfiniteScroll from 'react-infinite-scroller';
import SubCampus from './SubCampus';

const Campuses = ({ main }) => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    campusesService.getAll(setCampuses);
  }, []);
  if (campuses.length === 0) {
    return <Loading />;
  }

  return (
    <div
      style={{
        height: '50vh',
        // width: '100vw',
        // overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        // loadMore={loadFunc}
        useWindow={true}
        hasMore={false}
        loader={<Loading />}
      >
        {campuses.map((c) => (
          <SubCampus key={c.id} campus={c} main={main ? true : false} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Campuses;
