import React, { useState, useEffect, useRef } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { sortComment, daySortComment } from '../../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Label, StyledDropdown } from '../../Nav/NavTheme';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import userService from '../../../services/user';

const CommentSort = () => {
  const filter = useSelector((state) => state.comments.filter);
  const daySort = useSelector((state) => state.comments.daySort);
  const dispatch = useDispatch();
  const [active, setActive] = useState(filter);
  const [day, setDay] = useState(daySort);
  const firstRender = useRef();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const q = queryString.parse(location.search);
    if (q.sort && q.day) {
      setActive(q.sort);
      setDay(q.day);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      history.push(`?sort=${active}&day=${day}`);
    } else {
      const q = queryString.parse(location.search);
      if (!q.sort && !q.day) {
        history.push(`?sort=${active}&day=${day}`);
      }
      firstRender.current = true;
    }
  }, [active, day]);

  useEffect(() => {
    dispatch(sortComment(active));
  }, [active]);

  useEffect(() => {
    dispatch(daySortComment(day));
  }, [day]);

  return (
    <Menu style={{ marginBottom: '0' }} pointing secondary color="green">
      <Menu.Item>
        <StyledDropdown text={commentSortToLabel(active)}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="En Yeni"
              onClick={() => setActive('mostRecent')}
            />
            <Dropdown.Item
              text="En Eski"
              onClick={() => setActive('mostPast')}
            />
            <Dropdown.Item
              text="En Patili"
              onClick={() => setActive('mostPopular')}
            />
          </Dropdown.Menu>
        </StyledDropdown>
      </Menu.Item>
      <Menu.Item>
        <StyledDropdown
          text={
            <Label color="blue" bold pointer>
              <Icon name="calendar alternate outline" />
              {daySortToText(day)}
            </Label>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Bugün" onClick={() => setDay('today')} />
            <Dropdown.Item text="Bu Hafta" onClick={() => setDay('lastWeek')} />
            <Dropdown.Item text="Bu Ay" onClick={() => setDay('lastMonth')} />
            <Dropdown.Item
              text="Tüm Zamanlar"
              onClick={() => setDay('allTime')}
            />
          </Dropdown.Menu>
        </StyledDropdown>
      </Menu.Item>
    </Menu>
  );
};

export const commentSortToLabel = (sort) => {
  if (sort === 'mostRecent') {
    return (
      <>
        <Icon name="fire" color="blue" />
        <Label color="blue" pointer bold>
          En Yeni
        </Label>
      </>
    );
  } else if (sort === 'mostPast') {
    return (
      <>
        <Icon name="time" color="blue" />
        <Label color="blue" pointer bold>
          En Eski
        </Label>
      </>
    );
  } else if (sort === 'mostPopular') {
    return (
      <>
        <Icon name="paw" color="blue" />
        <Label color="blue" pointer bold>
          En Patili
        </Label>
      </>
    );
  }
};

export const daySortToText = (sort) => {
  if (sort === 'today') {
    return 'Bugün';
  } else if (sort === 'lastWeek') {
    return 'Bu Hafta';
  } else if (sort === 'lastMonth') {
    return 'Bu Ay';
  } else if (sort === 'allTime') {
    return 'Tüm Zamanlar';
  } else if (sort === 'tomorrow') {
    return 'Yarın';
  } else if (sort === 'nextWeek') {
    return 'Bu Hafta';
  } else if (sort === 'nextMonth') {
    return 'Bu Ay';
  }
};

export default CommentSort;
