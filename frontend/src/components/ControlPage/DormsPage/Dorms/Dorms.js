import React, { useState, useEffect } from 'react';
import dormsService from '../../../../services/dorms';
import CommentsLoading from '../../../Comments/CommentsLoading';
import InfiniteScroll from 'react-infinite-scroller';
import SubDorm from './SubDorm';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const Dorms = ({ main }) => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    dormsService.getAll(setDorms);
  }, []);
  if (dorms.length === 0) {
    return <CommentsLoading />;
  }

  return (
    <div style={InfiniteListStyle}>
      <InfiniteScroll
        pageStart={0}
        useWindow={true}
        hasMore={false}
        loadMore={() => null}
        loader={<CommentsLoading />}
      >
        {dorms.map((d) => (
          <SubDorm key={d.id} dorm={d} main />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Dorms;
