import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Modal,
  Button,
  Header,
  Segment,
  Form,
  Checkbox,
  Divider,
  Loader,
} from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import reportsService from '../../services/reports';
import { useDispatch, useSelector } from 'react-redux';

const CommentReport = ({
  comment,
  setIsReportOpen,
  isReportOpen,
  setIsReported,
}) => {
  const [raporTypes, setRaporTypes] = useState({
    isSpam: false,
    isHate: false,
    isCurse: false,
    extra: '',
    reportedUserId: comment.user.id,
    reportedUser: comment.user.username,
    reportedCommentId: comment.id,
    reportedComment: comment.comment,
    reportedCommentLikes: comment.likes,
    reportedCommentDate: comment.date,
    teacherId: comment.teacher,
    lessonId: comment.lesson,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    // setIsLoading(true);
    reportsService.postReport(
      raporTypes,
      setIsLoading,
      setIsReportOpen,
      setIsReported
    );
  };

  return (
    <Modal open={isReportOpen}>
      <Modal.Header>
        <Label color="blue">
          <Label color="green"> {comment.user.username}</Label> kullanıcısını
          ısırın.
        </Label>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
            <Header>
              <Label color="green">Isırma Sebebi:</Label>
            </Header>
            <Checkbox
              label="Spam"
              checked={raporTypes.isSpam}
              onClick={() =>
                setRaporTypes({ ...raporTypes, isSpam: !raporTypes.isSpam })
              }
              disabled={isLoading}
            />
            <br />
            <Checkbox
              label="Nefret Söylemi"
              checked={raporTypes.isHate}
              onClick={() =>
                setRaporTypes({ ...raporTypes, isHate: !raporTypes.isHate })
              }
              disabled={isLoading}
              style={{ paddingTop: '0.5em' }}
            />
            <br />

            <Checkbox
              label="Küfür"
              checked={raporTypes.isCurse}
              onClick={() =>
                setRaporTypes({ ...raporTypes, isCurse: !raporTypes.isCurse })
              }
              disabled={isLoading}
              style={{ paddingTop: '0.5em' }}
            />

            <Divider />
            <TextareaAutosize
              disabled={isLoading}
              rows={4}
              value={raporTypes.extra}
              onChange={(e) =>
                setRaporTypes({ ...raporTypes, extra: e.target.value })
              }
              style={{ width: '30vw', height: '4rem' }}
              placeholder="İsterseniz ısırma sebebizi yazın."
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={isLoading}
          negative
          content="İptal"
          icon="cancel"
          labelPosition="right"
          onClick={() => setIsReportOpen(false)}
        />
        <Button
          disabled={isLoading}
          positive
          labelPosition="right"
          icon="checkmark"
          content="Yolla"
          onClick={() => handleAction()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CommentReport;
