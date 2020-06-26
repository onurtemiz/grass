import React, { useEffect, useState } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import reportsService from '../../../services/reports';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../../reducers/usersReducer';
import { getCommentById } from '../../../reducers/commentReducer';
const Report = ({ r }) => {
  const [report, setReport] = useState(r);

  const handleDestroy = () => {
    reportsService.destroyComment(report.id);
    setReport({ ...report, isDestroyComment: !report.isDestroyComment });
  };

  const handleHide = () => {
    reportsService.hideComment(report.id);
    setReport({ ...report, isHideComment: !report.isHideComment });
  };

  const handleRemove = () => {
    reportsService.deleteReport(report.id);
    setReport(null);
  };
  if (report === null) {
    return null;
  }

  return (
    <Card>
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
        <div className="ui three buttons">
          <Button
            basic
            size="small"
            color={report.isDestroyComment ? 'red' : 'green'}
            onClick={() => handleDestroy()}
          >
            {report.isDestroyComment ? 'Geri Getir' : 'Yorumu Sil'}
          </Button>
          <Button
            basic
            color={report.isHideComment ? 'red' : 'green'}
            onClick={() => handleHide()}
          >
            {report.isHideComment ? 'Yorumu Görünür Yap' : 'Yorumu Gizle'}
          </Button>
          <Button basic color="red" onClick={() => handleRemove()}>
            Reportu Sil
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Report;
