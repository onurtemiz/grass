import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfClubs } from '../../../../reducers/clubReducer';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import { SubClub, SubClubAdmin } from './SubClub';
import CommentsLoading from '../../../Comments/CommentsLoading';
import Filter from '../../../Filter/Filter';
import { compareNames, useInfinite } from '../../../../utils/utils';
import NoSubResult from '../../../Search/NoSubResult';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const Clubs = ({ admin }) => {
  const { loadFunc, hasMore, currentTarget, ready, noResult } = useInfinite(
    'clubs',
    addInfClubs,
    filterClubs
  );

  if (!ready) {
    return <CommentsLoading />;
  }

  return (
    <div style={InfiniteListStyle}>
      <Filter target="Kulüp" />
      <Divider />
      {!ready ? (
        <CommentsLoading />
      ) : noResult ? (
        <NoSubResult />
      ) : (
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
          {currentTarget.map((c) =>
            admin ? (
              <SubClubAdmin club={c} key={c.id} />
            ) : (
              <SubClub club={c} key={c.id} main />
            )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Clubs;
function filterClubs(clubs, filter) {
  return clubs
    .filter((c) => {
      if (
        c.fullName.toUpperCase().includes(filter.toUpperCase()) ||
        c.name.toUpperCase().includes(filter.toUpperCase())
      ) {
        return true;
      } else {
        return false;
      }
    })
    .sort(compareNames);
}
