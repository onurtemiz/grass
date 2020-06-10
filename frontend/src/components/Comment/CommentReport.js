import React from 'react';
import LessonCommentReport from './LessonCommentReport';
import OtherCommentReport from './OtherCommentReport';

const CommentReport = ({
  setIsReportOpen,
  isReportOpen,
  comment,
  setIsReported,
  lesson,
}) => {
  if (lesson) {
    return (
      <LessonCommentReport
        setIsReportOpen={setIsReportOpen}
        isReportOpen={isReportOpen}
        comment={comment}
        setIsReported={setIsReported}
      />
    );
  } else {
    return (
      <OtherCommentReport
        setIsReportOpen={setIsReportOpen}
        isReportOpen={isReportOpen}
        comment={comment}
        setIsReported={setIsReported}
      />
    );
  }
};

export default CommentReport;
