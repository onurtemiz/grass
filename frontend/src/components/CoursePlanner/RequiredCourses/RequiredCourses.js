import React from 'react';
import { Table, Grid, Button, Icon } from 'semantic-ui-react';

const RequiredCourses = () => {
  return (
    <>
      <Grid.Column stretched>
        <Table style={{ height: '50%' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Zorunlu Ders Grubu 1</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Button basic fluid>
                Seçili Derslerden EKLE
              </Button>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
      <Grid.Column>
        <Button icon>
          <Icon name="add" />
        </Button>
      </Grid.Column>
    </>
  );
};

export default RequiredCourses;
