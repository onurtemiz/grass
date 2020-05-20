import React from 'react';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      color="blue"
      style={{ padding: '0em 3em' }}
      attached="bottom"
    >
      <Grid
        style={{ width: '100vw' }}
        style={{ paddingTop: '1em' }}
        relaxed="very"
      >
        <Grid.Row columns={3}>
          <Grid.Column width="1" style={{ padding: '0em 1em' }}>
            <Header inverted content="Hakkında" as={Link} to="/about" />
          </Grid.Column>
          <Grid.Column width="3">
            <Header
              inverted
              content="Katkı Sağlamak"
              as={Link}
              to="/contribution"
            />
          </Grid.Column>
          <Grid.Column width="12">
            Consent verecek hoca arıyorum...Consent verecek hoca
            arıyorum...Consent verecek hoca arıyorum
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Footer;
