import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoQuotas from './NoQuotas';
import courseService from '../../services/courses';
import CommentsLoading from '../Comments/CommentsLoading';
import { Table } from 'semantic-ui-react';

const QuotaTable = ({ course }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    let cTables = [];
    for (const key of Object.keys(course.quota)) {
      cTables.push(key);
    }
    setTables(cTables);
  }, []);
  return tables.map((t) => {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {Object.entries(course.quota[`${t}`][0]).map(([key, value]) => {
              console.log(key, value);
              return <Table.HeaderCell>{key}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(course.quota[`${t}`]).map(([key, value]) => {
            return (
              <Table.Row>
                {Object.entries(course.quota[`${t}`][key]).map(([k, v]) => {
                  return <Table.Cell>{v}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  });
};

export default QuotaTable;
