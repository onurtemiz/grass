import React, { useEffect, useState, useCallback } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import reportsService from '../../../services/reports';
import commentsServices from '../../../services/comments';
const Report = ({ r }) => {
  const [report, setReport] = useState(r);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    commentsServices.getCommentById(report.reportedCommentId, setComment);
  }, []);

  const handleDestroy = () => {
    reportsService.manageComment(comment.id, 'destroyed');
    setComment({ ...comment, commentStatus: 'destroyed' });
  };

  const handleHide = () => {
    reportsService.manageComment(comment.id, 'hidden');
    setComment({ ...comment, commentStatus: 'hidden' });
  };

  const handleVisible = () => {
    reportsService.manageComment(comment.id, 'visible');
    setComment({ ...comment, commentStatus: 'visible' });
  };

  const handleRemove = () => {
    reportsService.deleteReport(report.id);
    setReport(null);
  };
  if (report === null || comment == null) {
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
        <div className="ui four buttons">
          <Button
            basic
            color={comment.commentStatus === 'visible' ? 'green' : 'red'}
            onClick={() => handleVisible()}
          >
            {comment.commentStatus === 'visible' ? 'Visibled' : 'Visible'}
          </Button>
          <Button
            basic
            size="small"
            color={comment.commentStatus === 'destroyed' ? 'green' : 'red'}
            onClick={() => handleDestroy()}
          >
            {comment.commentStatus === 'destroyed' ? 'Destroyed' : 'Destroy'}
          </Button>
          <Button
            basic
            color={comment.commentStatus === 'hidden' ? 'green' : 'red'}
            onClick={() => handleHide()}
          >
            {comment.commentStatus === 'hidden' ? 'Hidden' : 'Hide'}
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
