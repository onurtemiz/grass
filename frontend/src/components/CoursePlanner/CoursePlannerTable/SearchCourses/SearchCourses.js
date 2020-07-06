import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import { searchCourse } from '../../../../reducers/courseReducer';
import {
  compareNames,
  getIdByDayHour,
  useInfinite,
} from '../../../../utils/utils';
import SubCourse from './SubCourse';
import CommentsLoading from '../../../Comments/CommentsLoading';
import NoSubResult from '../../../Search/NoSubResult';
const SearchCourses = () => {
  const count = useSelector((state) => state.courses.count);
  const start = useSelector((state) => state.courses.start);
  const hasMore = useSelector((state) => state.courses.hasMore);
  const targets = useSelector((state) => state.courses.courses);
  const findTime = useSelector((state) => state.courses.findTime);
  const [search, setSearch] = useState('');
  const notFindTime = useSelector((state) => state.courses.notFindTime);
  const dispatch = useDispatch();
  const [currentTarget, setCurrentTarget] = useState([]);
  const [ready, setReady] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(
      searchCourse(
        0,
        count,
        first,
        fetching,
        search,
        findTime.map((t) => t.id),
        notFindTime.map((t) => t.id)
      )
    );
  }, [search, findTime, notFindTime]);

  useEffect(() => {
    setCurrentTarget(filterCourses(targets, search, findTime, notFindTime));
  }, [targets, findTime, notFindTime]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(
        searchCourse(
          start,
          count,
          first,
          fetching,
          search,
          findTime.map((t) => t.id),
          notFindTime.map((t) => t.id)
        )
      );
    }
  };

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

  return (
    <>
      <Input
        icon="search"
        placeholder={`Ders Arayın...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        lang="tr"
        size="big"
        style={{ width: '100%' }}
      />
      <div
        style={{
          overflow: 'auto',
          maxHeight: '70vh',
          marginTop: '1em',
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
            {currentTarget.map((c) => (
              <SubCourse course={c} key={c.id} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

const filterCourses = (courses, search, findTime, notFindTime) => {
  let s = search.toUpperCase();
  let currentCourses = courses
    .filter(
      (c) =>
        c.name.toUpperCase().includes(s) ||
        c.parentName.toUpperCase().includes(s)
    )
    .sort(compareNames);
  if (findTime.length > 0) {
    currentCourses = currentCourses.filter((course) => {
      let q = 0;
      course.days.forEach((d, i) => {
        findTime.forEach((t) => {
          if (course.days[i] === t.day && course.hours[i] === t.hour) {
            q++;
          }
        });
      });
      return q === findTime.length;
    });
  }
  if (notFindTime.length > 0) {
    currentCourses = currentCourses.filter((course) => {
      let found = false;
      course.days.forEach((d, i) => {
        notFindTime.forEach((t) => {
          if (course.days[i] === t.day && course.hours[i] === t.hour) {
            found = true;
          }
        });
      });
      return !found;
    });
  }

  return currentCourses;
};

export default SearchCourses;
