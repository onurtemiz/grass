import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CommentsLoading from '../../../Comments/CommentsLoading';
import NoSubResult from '../../../Search/NoSubResult';
import moment from 'moment';
import { addInfEvent } from '../../../../reducers/eventReducer';
import SubEvent from './SubEvent';

const Events = ({ main }) => {
  const count = useSelector((state) => state.events.count);
  const start = useSelector((state) => state.events.start);
  const hasMore = useSelector((state) => state.events.hasMore);
  const daySort = useSelector((state) => state.events.filter);
  const targets = useSelector((state) => state.events.events);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentTarget, setCurrentTarget] = useState([]);
  const [ready, setReady] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfEvent(0, count, filter, first, fetching, daySort));
  }, [filter, daySort]);

  useEffect(() => {
    setCurrentTarget(filterEvents(targets, filter, daySort));
  }, [targets, daySort, filter]);

  useEffect(() => {
    if (first.current && currentTarget.length === 0) {
      setNoResult(true);
    } else if (currentTarget.length !== 0 && first.current) {
      setNoResult(false);
    }
    if (!first.current) {
      setReady(false);
    } else {
      setReady(true);
    }
  }, [currentTarget, first]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(addInfEvent(start, count, filter, first, fetching, daySort));
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: '300px',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
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
            {currentTarget.map((e) => (
              <SubEvent event={e} key={e.id} main />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Events;
function filterEvents(events, filter, daySort) {
  return events
    .filter((c) =>
      c.title.toUpperCase().includes(filter.toUpperCase()) ||
      c.subTitle.toUpperCase().includes(filter.toUpperCase())
        ? true
        : false
    )
    .filter((e) => {
      return rangeInFilter(moment(e.date), daySort);
    });
}

const rangeInFilter = (eventDate, daySort) => {
  if (daySort === 'today') {
    return eventDate >= moment().startOf('day') &&
      eventDate <= moment().endOf('day')
      ? true
      : false;
  } else if (daySort === 'nextWeek') {
    return eventDate >= moment().startOf('week') &&
      eventDate <= moment().endOf('week')
      ? true
      : false;
  } else if (daySort === 'nextMonth') {
    return eventDate >= moment().startOf('month') &&
      eventDate <= moment().endOf('month')
      ? true
      : false;
  } else if (daySort === 'allTime') {
    return true;
  }
};
