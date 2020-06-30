import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCourse } from '../../../../reducers/courseReducer';
import { compareNames } from '../../../../utils/utils';
import SubCourse from './SubCourse';
const SearchCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const findTime = useSelector((state) => state.courses.findTime);
  const [search, setSearch] = useState('');
  const [currentCourses, setCurrentCourses] = useState([]);

  useEffect(() => {
    if (search !== '') {
      dispatch(searchCourse(search, findTime));
    }
  }, [search]);

  useEffect(() => {
    setCurrentCourses(filterCourses(search, courses));
  }, [courses]);

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

const filterCourses = (search, courses) => {
  let s = search.toLocaleUpperCase('tr-TR');
  let currentCourses = courses
    .filter(
      (c) =>
        c.name.toLocaleUpperCase('tr-TR').includes(s) ||
        c.parentName.toLocaleUpperCase('tr-TR').includes(s)
    )
    .sort(compareNames)
    .slice(0, 10);
  return currentCourses;
};

export default SearchCourses;
