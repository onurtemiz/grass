import React from 'react';
import { Placeholder } from 'semantic-ui-react';
const CommentsLoading = ({ skeletonLength }) => {
  return [...Array(skeletonLength ? skeletonLength : 2)].map((e, i) => (
    <Placeholder style={{ marginTop: '1em', marginLeft: '1em' }} key={i}>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  ));
};

export default CommentsLoading;
