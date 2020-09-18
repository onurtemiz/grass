import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import courseService from '../../services/courses';
import { Table, Icon, Card, Loader, Dimmer } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { unFollowCourse } from '../../reducers/userReducer';
import { isMobile } from 'react-device-detect';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import styled from 'styled-components';
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
    if (updatedCourse.error) {
      toast.error(`${updatedCourse.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
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

  return (
    <StyledCard>
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
      <Card.Content>
        <Card.Header>
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
        </Card.Header>
        <Card.Meta>{course.parentName}</Card.Meta>
        <Card.Description>
          {!course.quota
            ? 'Bu dersin kota bilgisi henüz yayınlanmadı.'
            : tables.map((t) => {
                return (
                  <div key={lodash.uniqueId()}>
                    <Label color="green" bold>
                      {t}
                    </Label>
                    <Table
                      celled
                      striped
                      collapsing
                      compact
                      unstackable={isMobile}
                    >
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
                        {Object.entries(course.quota[`${t}`]).map(
                          ([key, value]) => {
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
                          }
                        )}
                      </Table.Body>
                    </Table>
                  </div>
                );
              })}
        </Card.Description>
      </Card.Content>
    </StyledCard>
  );
};

export default QuotaTable;

const StyledCard = styled(Card)`
  width: unset !important;
`;
