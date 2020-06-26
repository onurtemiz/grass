import React, { useState, useEffect } from 'react';
import tipsService from '../../../services/tips';
import { Card } from 'semantic-ui-react';

import Tip from './Tip';
const ControlTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    getAllTips();
  }, []);

  const getAllTips = async () => {
    const allTips = await tipsService.getAllTips();
    setTips(allTips);
  };
  if (tips.length === 0) {
    return null;
  }
  return (
    <Card.Group>
      {tips.map((t) => {
        return <Tip t={t} key={t.id} />;
      })}
    </Card.Group>
  );
};

export default ControlTips;
