import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInfAll } from '../../reducers/allReducer';
import SubLesson from '../Teachers/SubLesson';
import { Search as S } from 'semantic-ui-react';
import lodash from 'lodash';

const Search = ({ size }) => {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.all.all);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(addInfAll(0, 20, value));

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [value]);

  const filterSearch = (all) => {
    const onlyTeacherNames = all.filter((l) =>
      l.teacher.name
        .toLocaleUpperCase('tr-TR')
        .includes(value.toLocaleUpperCase('tr-TR'))
    );
    const onlyLessonNames = all.filter((l) => {
      return !!l.fullName.toUpperCase().includes(value.toUpperCase());
    });
    const q = lodash
      .union(onlyLessonNames, onlyTeacherNames)
      .sort((a, b) => a.sectionCode - b.sectionCode)
      .sort((a, b) => a.digitCode - b.digitCode);
    return q;
  };

  const resRender = (l) => {
    return <SubLesson lesson={l} key={l.id} />;
  };

  const handleOnSearchChange = (e) => {
    setIsLoading(true);
    setValue(e.target.value);
  };

  return (
    <S
      loading={isLoading}
      minCharacters={1}
      onSearchChange={(e) => handleOnSearchChange(e)}
      value={value}
      results={filterSearch(all)}
      placeholder="Ders, Hoca, Kulüp ya da Kullanıcı Arayın."
      size={size ? size : 'massive'}
      noResultsMessage="Aradığınız kritere uygun bir şey bulunamadı."
      resultRenderer={resRender}
    ></S>
  );
};

export default Search;
