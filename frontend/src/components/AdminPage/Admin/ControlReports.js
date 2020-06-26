import React, { useState, useEffect } from 'react';
import reportsService from '../../../services/reports';
import { Card } from 'semantic-ui-react';

import Report from './Report';
const ControlReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAllReports();
  }, []);

  const getAllReports = async () => {
    const allReports = await reportsService.getAllReports();
    setReports(allReports);
  };
  console.log('reports', reports);
  if (reports.length === 0) {
    return null;
  }
  return (
    <Card.Group>
      {reports.map((r) => {
        return <Report r={r} key={r.id} />;
      })}
    </Card.Group>
  );
};

export default ControlReports;
