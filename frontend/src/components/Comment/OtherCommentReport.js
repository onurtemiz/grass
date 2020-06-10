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
import CommentReportModal from './CommentReportModal';

const OtherCommentReport = ({
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
    typeId: comment.club
      ? comment.club.id
      : comment.dorm
      ? comment.dorm.id
      : comment.campus
      ? comment.campus.id
      : comment.question.id,
    reportedCommentType: comment.commentType,
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
    <CommentReportModal
      isReportOpen={isReportOpen}
      comment={comment}
      raporTypes={raporTypes}
      setRaporTypes={setRaporTypes}
      isLoading={isLoading}
      setIsReportOpen={setIsReportOpen}
      handleAction={handleAction}
    />
  );
};

export default OtherCommentReport;
