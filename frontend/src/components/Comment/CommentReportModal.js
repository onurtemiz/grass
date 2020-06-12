import React from 'react';
import {
  Modal,
  Button,
  Header,
  Form,
  Checkbox,
  Divider,
} from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';

const CommentReportModal = ({
  isReportOpen,
  comment,
  raporTypes,
  setRaporTypes,
  isLoading,
  setIsReportOpen,
  handleAction,
}) => {
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
          labelPosition="left"
          onClick={() => setIsReportOpen(false)}
        />
        <Button
          disabled={isLoading}
          positive
          labelPosition="left"
          icon="checkmark"
          content="Yolla"
          onClick={() => handleAction()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CommentReportModal;
