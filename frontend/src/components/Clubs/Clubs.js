import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfClubs } from '../../reducers/clubReducer';
import { LinearProgress } from '@material-ui/core';
import { Card } from 'semantic-ui-react';
import { SubClub, SubClubAdmin } from './SubClub';
import CommentsLoading from '../Comments/CommentsLoading';
const Clubs = ({ admin }) => {
  const count = useSelector((state) => state.clubs.count);
  const start = useSelector((state) => state.clubs.start);
  const hasMore = useSelector((state) => state.clubs.hasMore);
  const clubs = useSelector((state) => state.clubs.clubs);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfClubs(0, count, filter));
  }, [filter]);

  const filterClubs = (clubs) => {
    const bothNames = clubs.filter((c) => {
      if (
        c.fullName.toUpperCase().includes(filter.toUpperCase()) ||
        c.shortName.toUpperCase().includes(filter.toUpperCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    return bothNames;
  };

  const loadFunc = () => {
    dispatch(addInfClubs(start, count, filter));
  };

  if (clubs.length === 0) {
    return <LinearProgress />;
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
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <CommentsLoading skeletonLength={1} />
          </div>
        }
        useWindow={false}
      >
        {filterClubs(clubs).map((c) =>
          admin ? (
            <SubClubAdmin club={c} key={c.id} />
          ) : (
            <SubClub club={c} key={c.id} main />
          )
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Clubs;
