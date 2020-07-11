import React from 'react';
import { Icon, Header, Container, Grid } from 'semantic-ui-react';
const NoSubResult = () => {
  return (
    <Container fluid>
      <Grid
        verticalAlign="middle"
        columns={1}
        centered
        stretched
        style={{ minHeight: '200px', width: '90vw', maxWidth: '640px' }}
      >
        <Grid.Row centered stretched>
          <Grid.Column textAlign="center">
            <Header as="h1" color="green">
              <Icon name="eye" size="massive" />
              Aradığınız sonuç bulunamadı.
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NoSubResult;
