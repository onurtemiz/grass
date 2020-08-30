import React from 'react';
import { Icon, Header, Container, Grid } from 'semantic-ui-react';
const NoQuotas = () => {
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
              <Icon name="sliders" size="massive" />
              Henüz herhangi bir dersin kotasını takip etmiyorsun. Bu dönem
              aktif derslerden birini takip et!
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NoQuotas;
