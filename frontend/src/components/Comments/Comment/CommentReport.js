import React from 'react';
import OtherCommentReport from './OtherCommentReport';

const CommentReport = ({
  setIsReportOpen,
  isReportOpen,
  comment,
  setIsReported,
}) => {
  return (
    <OtherCommentReport
      setIsReportOpen={setIsReportOpen}
      isReportOpen={isReportOpen}
      comment={comment}
      setIsReported={setIsReported}
    />
  );
};

export default CommentReport;
