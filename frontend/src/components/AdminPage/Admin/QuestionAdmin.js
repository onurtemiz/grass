import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUB_PATH } from '../../../utils/config';
import { Card, Header, Segment, Form, Button } from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
import { ClubForm } from '../Admin/ControlClub';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import questionsService from '../../../services/questions';
import SubQuestion from '../../ControlPage/QuestionsPage/Questions/SubQuestion';
const QuestionAdmin = ({ question }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };
  if (isEdit) {
    return <QuestionForm setIsEdit={setIsEdit} question={question} />;
  }
  return (
    <div onClick={() => handleEdit()}>
      <SubQuestionAdmin question={question} />
    </div>
  );
};

const SubQuestionAdmin = ({ question }) => {
  return (
    <div style={{ marginLeft: '1em', marginRight: '1em' }}>
      <Card
        fluid
        style={{
          marginTop: '1em',
          paddingLeft: '0.5em',
          paddingTop: '0.5em',
          paddingBottom: '0.2em',
        }}
        color={question.isApproved ? 'blue' : 'red'}
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2">
            <Header.Content>
              <Label color="blue" bold pointer>
                {question.question}
              </Label>
            </Header.Content>
          </Header>
        </Card.Header>
        <Card.Description>
          <Label color="green" bold pointer>
            {question.description}
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

const QuestionForm = ({ setIsEdit, question }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      question: question.question,
      description: question.description,
    },
  });

  const handleRemove = () => {
    questionsService.removeQuestion(question.id);
    setIsEdit(false);
  };

  const handleApprove = () => {
    questionsService.approveQuestion(question.id);
    setIsEdit(false);
  };

  const handleEditApprove = (data) => {
    questionsService.editApproveQuestion({
      ...question,
      description: data.description,
      question: data.question,
    });
    setIsEdit(false);
  };

  return (
    <Segment compact basic>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <Form.Field>
          <label>Soru</label>
          <input placeholder="Soru" ref={register} name="question" />
          {errors.question && (
            <>
              <br />
              <Label basic color="red" pointing="above">
                {errors.question.message}
              </Label>
            </>
          )}
        </Form.Field>
        <Form.Field>
          <label>Açıklama</label>
          <TextareaAutosize
            rows={4}
            style={{ width: '30vw', height: '4rem' }}
            placeholder="Nasıldır?"
            name="description"
            ref={register({
              required: 'Lütfen yorumunuzu yazın',
              maxLength: {
                value: 1000,
                message: 'Yorumunuz 1000 karakterden az olmalı.',
              },
              validate: (comment) =>
                comment.trim().length !== 0 ||
                'Yorumunuz sadece boşluklardan oluşamaz.',
            })}
          />
          {errors.description && (
            <>
              <br />
              <Label basic color="red" pointing="above">
                {errors.description.message}
              </Label>
            </>
          )}
        </Form.Field>
        <br />
        <Button
          style={{ marginTop: '1em' }}
          content="Düzenle ve Onayla"
          color="green"
          type="submit"
          onClick={handleSubmit(handleEditApprove)}
        />
        <Button
          style={{ marginTop: '1em' }}
          content="Onayla"
          color="blue"
          type="submit"
          onClick={() => handleApprove()}
        />{' '}
        <Button
          style={{ marginTop: '1em' }}
          content="Kapat"
          color="red"
          type="submit"
          onClick={() => setIsEdit(false)}
        />{' '}
        <Button
          style={{ marginTop: '1em' }}
          content="Sil"
          color="red"
          type="submit"
          onClick={() => handleRemove()}
        />
      </Form>
    </Segment>
  );
};

export default QuestionAdmin;
