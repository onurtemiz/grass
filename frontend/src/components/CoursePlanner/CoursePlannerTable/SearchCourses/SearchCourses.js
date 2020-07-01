import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCourse } from '../../../../reducers/courseReducer';
import { compareNames, getIdByDayHour } from '../../../../utils/utils';
import SubCourse from './SubCourse';
const SearchCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const findTime = useSelector((state) => state.courses.findTime);
  const notFindTime = useSelector((state) => state.courses.notFindTime);

  const [search, setSearch] = useState('');
  const [currentCourses, setCurrentCourses] = useState([]);

  useEffect(() => {
    dispatch(
      searchCourse(
        search,
        findTime.map((t) => t.id),
        notFindTime.map((t) => t.id)
      )
    );
  }, [search, findTime, notFindTime]);

  useEffect(() => {
    setCurrentCourses(filterCourses(courses, search, findTime, notFindTime));
  }, [courses, findTime, notFindTime]);

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
          maxHeight: '50vh',
        }}
      >
        {currentCourses.length === 0
          ? null
          : currentCourses.map((c) => {
              return <SubCourse course={c} key={c.id} />;
            })}
      </div>
    </>
  );
};

const filterCourses = (courses, search, findTime, notFindTime) => {
  let s = search.toLocaleUpperCase('tr-TR');
  let currentCourses = courses
    .filter(
      (c) =>
        c.name.toLocaleUpperCase('tr-TR').includes(s) ||
        c.parentName.toLocaleUpperCase('tr-TR').includes(s)
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
    console.log('currentCourses', currentCourses);
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
    console.log('currentCourses', currentCourses);
  }

  return currentCourses;
};

export default SearchCourses;
