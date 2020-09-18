import React, { useState, useEffect } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { HomeSearch, HomeHeader, HomeGrid } from './HomeTheme';
import Search from '../../Search/Search';
import { Label } from '../../Nav/NavTheme';
import { useLocation } from 'react-router-dom';
import Tips from './Tips';
import tipsService from '../../../services/tips';
import { isMobile } from 'react-device-detect';

const Home = () => {
  const [tip, setTip] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getTip();
  }, [location]);

  const getTip = async () => {
    const tip = await tipsService.getTip();
    setTip(tip);
  };

  if (tip === null) {
    return null;
  }
  return (
    <Container fluid style={{ marginTop: '4em' }}>
      <HomeGrid verticalAlign="middle" centered columns={1} stretched>
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <HomeHeader as="h1">
              <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
            </HomeHeader>
            <Label color="blue" bold>
              Daha iyi bir Boğaziçi deneyimi
            </Label>
            <br />
            {!isMobile && (
              <>
                <HomeSearch>
                  <Search />
                </HomeSearch>
              </>
            )}
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Label
                color="green"
                bold
                style={{
                  overflowWrap: 'anywhere',
                  marginRight: '10vw',
                  marginLeft: '10vw',
                }}
              >
                {tip.isAnonim ? 'Boğaziçili' : tip.user} Tavsiye Ediyor:{' '}
                <Label color="blue" bold>
                  {tip.tip}
                </Label>
              </Label>
            </div>
            <br />
            <Tips />
          </Grid.Column>
        </Grid.Row>
        <Label
          color="blue"
          bold
          style={{ position: 'fixed', bottom: '3em', width: '100%' }}
        >
          © 2020 Onur Temiz. Tüm hakları saklıdır.
        </Label>
      </HomeGrid>
    </Container>
  );
};

export default Home;
