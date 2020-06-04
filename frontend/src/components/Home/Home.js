import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfAll } from '../../reducers/allReducer';
import SubTeacher from '../Teachers/SubTeacher';
import SubLesson from '../Teachers/SubLesson';
import { LinearProgress } from '@material-ui/core';
import {
  Search,
  Grid,
  Container,
  Header,
  Input,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
import lodash from 'lodash';

import { HomeSearch, HomeHeader, HomeGrid } from './HomeTheme';

const Home = () => {
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

  const filterHome = (all) => {
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
    <Container fluid>
      <HomeGrid verticalAlign="middle" centered columns={1} stretched>
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <HomeHeader as="h1">
              <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
            </HomeHeader>
            <br />
            <HomeSearch
              loading={isLoading}
              minCharacters={1}
              onSearchChange={(e) => handleOnSearchChange(e)}
              value={value}
              results={filterHome(all)}
              placeholder="Ders, Hoca, Kulüp ya da Kullanıcı Arayın."
              size="massive"
              noResultsMessage="Aradığınız kritere uygun bir şey bulunamadı."
              resultRenderer={resRender}
            ></HomeSearch>
          </Grid.Column>
        </Grid.Row>
      </HomeGrid>
    </Container>
  );
};

export default Home;
