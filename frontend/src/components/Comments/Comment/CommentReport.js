import React, { useState } from 'react';

import reportsService from '../../../services/reports';
import CommentReportModal from './CommentReportModal';

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
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    setIsLoading(true);
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

export default CommentReport;
