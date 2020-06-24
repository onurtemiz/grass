import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfClubs } from '../../reducers/clubReducer';
import { LinearProgress } from '@material-ui/core';
import { Card, Divider } from 'semantic-ui-react';
import { SubClub, SubClubAdmin } from './SubClub';
import CommentsLoading from '../Comments/CommentsLoading';
import Filter from '../Filter/Filter';
const Clubs = ({ admin }) => {
  const count = useSelector((state) => state.clubs.count);
  const start = useSelector((state) => state.clubs.start);
  const hasMore = useSelector((state) => state.clubs.hasMore);
  const clubs = useSelector((state) => state.clubs.clubs);
  const filter = useSelector((state) => state.filter);
  const [currentClubs, setCurrentClubs] = useState([]);
  const dispatch = useDispatch();
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfClubs(0, count, filter, first, fetching));
  }, [filter]);

  useEffect(() => {
    setCurrentClubs(
      clubs.filter((c) => {
        if (
          c.fullName.toUpperCase().includes(filter.toUpperCase()) ||
          c.name.toUpperCase().includes(filter.toUpperCase())
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [clubs]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(addInfClubs(start, count, filter, first, fetching));
    }
  };
  if (currentClubs.length === 0) {
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
      <Filter target="Kulüp" />
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
        {currentClubs.map((c) =>
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
