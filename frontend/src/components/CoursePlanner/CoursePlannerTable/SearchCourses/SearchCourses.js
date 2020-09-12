import React, { useState, useEffect, useRef } from 'react';
import { Input, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import { searchCourse } from '../../../../reducers/courseReducer';
import { compareNames } from '../../../../utils/utils';
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
  const [isOffline, setIsOffline] = useState(false);
  const refValue = useRef('');
  const [storedTimeout, setStoredTimeout] = useState(null);

  useEffect(() => {
    dispatch(
      searchCourse(
        0,
        count,
        first,
        fetching,
        search,
        findTime.map((t) => t.id),
        notFindTime.map((t) => t.id),
        isOffline
      )
    );
  }, [search, findTime, notFindTime, isOffline]);

  useEffect(() => {
    setCurrentTarget(
      filterCourses(targets, search, findTime, notFindTime, isOffline)
    );
  }, [targets, findTime, notFindTime, isOffline]);

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
          notFindTime.map((t) => t.id),
          isOffline
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

  const handleValueChange = (e) => {
    refValue.current = e.target.value;

    if (storedTimeout) clearTimeout(storedTimeout);
    setStoredTimeout(
      setTimeout(() => {
        setSearch(refValue.current);
      }, 300)
    );
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          icon="search"
          placeholder={`Ders Arayın...`}
          value={refValue.current}
          onChange={(e) => handleValueChange(e)}
          lang="tr"
          size="big"
          style={{ width: '90%', marginLeft: '1em' }}
        />
        <Popup
          content={
            <Checkbox
              checked={isOffline}
              onClick={() => setIsOffline(!isOffline)}
              label="Sadece Offline Dersleri Göster"
            />
          }
          position="bottom right"
          hoverable
          trigger={
            <Icon
              name="filter"
              color="blue"
              size="big"
              style={{ paddingLeft: '0.5em' }}
              fitted
            />
          }
        />
      </div>
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

const filterCourses = (courses, search, findTime, notFindTime, isOffline) => {
  let s = search.toUpperCase();
  let currentCourses = courses
    .filter((c) => {
      if (isOffline) {
        return c.place !== 'Online';
      } else {
        return true;
      }
    })
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
