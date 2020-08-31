import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NoQuotas from './NoQuotas';
import courseService from '../../services/courses';
import CommentsLoading from '../Comments/CommentsLoading';
import {
  Table,
  Accordion,
  Divider,
  Header,
  Segment,
  Icon,
} from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { unFollowCourse } from '../../reducers/userReducer';
import { isMobile } from 'react-device-detect';
import lodash from 'lodash';

import moment from 'moment';
const QuotaTable = ({ c, setCourses, courses }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(c);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  moment.locale('tr');
  const updateCourse = useCallback(async () => {
    const updatedCourse = await courseService.quotaUpdate(course, setLoading);
    setCourse(updatedCourse);
  }, []);
  useEffect(() => {
    if (course.quota) {
      let cTables = [];
      for (const key of Object.keys(course.quota)) {
        cTables.push(key);
      }
      setTables(cTables);
    }
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    await updateCourse();
  };

  const handleRemove = () => {
    dispatch(unFollowCourse(user, course.id));
    setCourses(courses.filter((co) => co.id !== course.id));
  };
  console.log(course);
  if (!course.quota) {
    return (
      <div style={{ marginLeft: '1em', marginTop: '1em' }}>
        <Segment compact loading={loading}>
          <Header as="h2">
            <Label color="blue" bold>
              {course.name}{' '}
              <label style={{ fontSize: '12px', color: '#00000066' }}>
                {moment(new Date(course.lastChange)).fromNow()}{' '}
              </label>
              <Icon
                name="delete"
                color="grey"
                style={{ float: 'right' }}
                size="small"
                onClick={() => handleRemove()}
              />
              <Icon
                name="refresh"
                color="grey"
                style={{ float: 'right' }}
                size="small"
                onClick={() => handleUpdate()}
              />
            </Label>
          </Header>
          Kota bilgisi henüz yok.
        </Segment>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: '1em', marginTop: '1em' }}>
      <Segment compact loading={loading}>
        <Header as="h2">
          <Label color="blue" bold>
            {course.name}{' '}
            <label style={{ fontSize: '12px', color: '#00000066' }}>
              {moment(new Date(course.lastChange)).fromNow()}
            </label>
            <Icon
              name="delete"
              color="grey"
              style={{ float: 'right' }}
              size="small"
              onClick={() => handleRemove()}
            />
            <Icon
              name="refresh"
              color="grey"
              style={{ float: 'right' }}
              size="small"
              onClick={() => handleUpdate()}
            />
          </Label>
        </Header>
        {tables.map((t) => {
          return (
            <div key={lodash.uniqueId()}>
              <Label color="green" bold>
                {t}
              </Label>
              <Table celled striped collapsing compact unstackable={isMobile}>
                <Table.Header>
                  <Table.Row>
                    {Object.entries(course.quota[`${t}`][0]).map(
                      ([key, value]) => {
                        return (
                          <Table.HeaderCell key={lodash.uniqueId()}>
                            {key}
                          </Table.HeaderCell>
                        );
                      }
                    )}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Object.entries(course.quota[`${t}`]).map(([key, value]) => {
                    return (
                      <Table.Row key={lodash.uniqueId()}>
                        {Object.entries(course.quota[`${t}`][key]).map(
                          ([k, v]) => {
                            return (
                              <Table.Cell key={lodash.uniqueId()}>
                                {v}
                              </Table.Cell>
                            );
                          }
                        )}
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          );
        })}
      </Segment>
    </div>
  );
};

export default QuotaTable;
