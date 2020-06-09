import React, { useState, useEffect } from 'react';
import dormsService from '../../services/dorms';
import { Loading } from '../Comments/Comments';
import InfiniteScroll from 'react-infinite-scroller';
import SubDorm from './SubDorm';

const Dorms = ({ main }) => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    dormsService.getAll(setDorms);
  }, []);
  if (dorms.length === 0) {
    return <Loading />;
  }

  return (
    <div
      style={{
        height: '50vh',
        // width: '100vw',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        // loadMore={loadFunc}
        useWindow={true}
        hasMore={false}
        loader={<Loading />}
      >
        {dorms.map((d) => (
          <SubDorm key={d.id} dorm={d} main={main ? true : false} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Dorms;
