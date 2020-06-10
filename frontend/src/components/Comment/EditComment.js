import React, { useState, useEffect } from 'react';
import { updateComment } from '../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { Form, Button, Segment, Label } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

const EditComment = ({ comment, setIsUpdate }) => {
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();
  const [commentError, setCommentError] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(comment.comment);
    setTools(true);
  }, []);

  const handleCommentChange = (e) => {
    setValue(e.target.value);
    setCommentError('');
  };

  const handleComment = async () => {
    if (value.length > 4000) {
      setCommentError('4000 harften çok olamaz.');
      return;
    }
    setIsLoading(true);
    dispatch(updateComment(value, comment.id, setIsUpdate, setIsLoading));
  };

  return (
    <Segment compact basic loading={isLoading}>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <TextareaAutosize
          rows={4}
          value={value}
          onChange={(e) => handleCommentChange(e)}
          style={{ width: '30vw', height: '4rem' }}
          placeholder="Nasıldır?"
          onFocus={() => setTools(true)}
        />

        {tools ? (
          <div>
            {commentError && (
              <Label basic color="red" pointing="above">
                {commentError}
              </Label>
            )}
            <Button
              style={{ marginTop: '1em' }}
              content={'Yorumu Düzenleyin'}
              labelPosition="left"
              icon="edit"
              color="green"
              onClick={() => {
                handleComment();
              }}
            />
            <Button
              style={{ marginTop: '1em' }}
              content="İptal"
              labelPosition="left"
              icon="cancel"
              color="red"
              onClick={() => {
                setTools(false);
                setValue('');
              }}
            />
          </div>
        ) : null}
      </Form>
    </Segment>
  );
};

export default EditComment;
