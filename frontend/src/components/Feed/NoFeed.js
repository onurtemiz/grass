import React from 'react';
import { Icon, Header, Container, Grid } from 'semantic-ui-react';
const NoFeed = ({ blocking }) => {
  const icon = blocking === 'noLesson' ? 'hockey puck' : 'comment';
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
              Henüz takip ettiğin kimse yok ya da takip ettiklerine yorum
              yapılmamış.
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NoFeed;
