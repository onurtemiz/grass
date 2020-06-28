import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Modal,
  Button,
  Header,
  Placeholder,
} from 'semantic-ui-react';
import { HomeSearch, HomeHeader, HomeGrid } from './HomeTheme';
import Search from '../../Search/Search';
import { Label } from '../../Nav/NavTheme';
import CommentForm from '../../Comments/CommentForm/CommentForm';
import { useLocation } from 'react-router-dom';
import Tips from './Tips';
import tipsService from '../../../services/tips';
const Home = () => {
  const [tip, setTip] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getTip();
  }, [location]);

  const getTip = async () => {
    const tip = await tipsService.getTip();
    console.log('tip', tip);
    setTip(tip);
  };

  if (tip === null) {
    return null;
  }
  console.log('tip', tip);
  return (
    <Container fluid>
      <HomeGrid verticalAlign="middle" centered columns={1} stretched>
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <HomeHeader as="h1">
              <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
            </HomeHeader>
            <Label color="green" bold>
              {tip.isAnonim ? 'Boğaziçili' : tip.user} Tavsiye Ediyor:{' '}
              <Label color="blue" bold>
                {tip.tip}
              </Label>
            </Label>
            <br />
            <HomeSearch>
              <Search />
            </HomeSearch>
          </Grid.Column>
        </Grid.Row>
        <Tips home />
      </HomeGrid>
    </Container>
  );
};

export default Home;
