import React, { useEffect, useState } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import reportsService from '../../services/reports';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../reducers/usersReducer';
import { getCommentById } from '../../reducers/commentReducer';
const Report = ({ r }) => {
  const [report, setReport] = useState(r);

  const handleApprove = () => {
    reportsService.approveReport(report.id);
    setReport({ ...report, isApproved: !report.isApproved });
  };

  const handleRemove = () => {
    reportsService.deleteReport(report.id);
    setReport(null);
  };
  if (report === null) {
    return null;
  }

  return (
    <Card color={report.isApproved ? 'green' : 'red'}>
      <Card.Content>
        <Card.Header>
          {r.user} VS {r.reportedUser}
        </Card.Header>
        <Divider />
        <Card.Meta>Curse: {`${report.isCurse}`}</Card.Meta>
        <Card.Meta>Spam: {`${report.isSpam}`}</Card.Meta>
        <Card.Meta>Hate: {`${report.isHate}`}</Card.Meta>
        <Card.Meta>Extra: {`${report.extra}`}</Card.Meta>
        <Divider />
        <Card.Description>{r.reportedComment}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color={report.isApproved ? 'red' : 'green'}
            onClick={() => handleApprove()}
          >
            {report.isApproved ? 'Onay Kaldır' : 'Onayla'}
          </Button>
          <Button basic color="red" onClick={() => handleRemove()}>
            Sil
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Report;
