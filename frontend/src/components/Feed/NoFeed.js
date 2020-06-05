import React from 'react';
import { Icon, Header, Container, Grid } from 'semantic-ui-react';
const NoFeed = ({ blocking }) => {
  const message =
    blocking === 'noLesson'
      ? 'Henüz hiçbir dersi takip etmiyorsun.'
      : 'Henüz kimse takip etttiğin derslere yorum yapmamış.';

  const icon = blocking === 'noLesson' ? 'podcast' : 'comment';
  return (
    <Container fluid>
      <Grid
        verticalAlign="middle"
        centered
        columns={1}
        stretched
        style={{ height: '60vh' }}
      >
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <Header as="h1" color="green">
              <Icon name={icon} size="massive" />
              {message}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NoFeed;
