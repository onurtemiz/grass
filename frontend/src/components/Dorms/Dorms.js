import React, { useState, useEffect } from 'react';
import dormsService from '../../services/dorms';
import CommentsLoading from '../Comments/CommentsLoading';
import InfiniteScroll from 'react-infinite-scroller';
import SubDorm from './SubDorm';

const Dorms = ({ main }) => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    dormsService.getAll(setDorms);
  }, []);
  if (dorms.length === 0) {
    return <CommentsLoading />;
  }

  return (
    <div
      style={{
        minHeight: '300px',
        maxHeight: '500px',
        // width: '100vw',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        // loadMore={loadFunc}
        useWindow={true}
        hasMore={false}
        loader={<CommentsLoading />}
      >
        {dorms.map((d) => (
          <SubDorm key={d.id} dorm={d} main={main ? true : false} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Dorms;
