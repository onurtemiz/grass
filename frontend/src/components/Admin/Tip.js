import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import tipsService from '../../services/tips';

const Tip = ({ t }) => {
  const [tip, setTip] = useState(t);

  const handleApprove = () => {
    tipsService.approveTip(tip.id);
    setTip({ ...tip, isApproved: !tip.isApproved });
  };

  const handleRemove = () => {
    tipsService.deleteTip(tip.id);
    setTip(null);
  };

  if (tip === null) {
    return null;
  }

  return (
    <Card color={tip.isApproved ? 'green' : 'red'}>
      <Card.Content>
        <Card.Meta>Anonim: {`${tip.isAnonim}`}</Card.Meta>
        <Card.Meta>Approved: {`${tip.isApproved}`}</Card.Meta>

        <Card.Description>{tip.tip}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color={tip.isApproved ? 'red' : 'green'}
            onClick={() => handleApprove()}
          >
            {tip.isApproved ? 'Onay Kaldır' : 'Onayla'}
          </Button>
          <Button basic color="red" onClick={() => handleRemove()}>
            Sil
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Tip;
