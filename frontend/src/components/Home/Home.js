import React from 'react';
import { Grid, Container, Modal, Button, Header } from 'semantic-ui-react';
import { HomeSearch, HomeHeader, HomeGrid } from './HomeTheme';
import Search from '../Search/Search';
import { GreenLabel, BlueLabel } from '../Nav/NavTheme';
import CommentForm from '../CommentForm/CommentForm';
import Tips from './Tips';
const Home = () => {
  return (
    <Container fluid>
      <HomeGrid verticalAlign="middle" centered columns={1} stretched>
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <HomeHeader as="h1">
              <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
            </HomeHeader>
            <GreenLabel style={{ fontWeight: 'bold' }}>
              Boğaziçili Tavsiye Ediyor: Ec102 dersini almayın.
            </GreenLabel>
            <br />
            <HomeSearch>
              <Search />
            </HomeSearch>
          </Grid.Column>
        </Grid.Row>
        <Tips />
      </HomeGrid>
    </Container>
  );
};

export default Home;
