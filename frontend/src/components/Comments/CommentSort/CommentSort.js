import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { sortComment, daySortComment } from '../../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Label, StyledDropdown } from '../../Nav/NavTheme';

const CommentSort = () => {
  const filter = useSelector((state) => state.comments.filter);
  const daySort = useSelector((state) => state.comments.daySort);
  const dispatch = useDispatch();
  const [active, setActive] = useState(filter);
  const [day, setDay] = useState(daySort);

  useEffect(() => {
    dispatch(sortComment(active));
  }, [active]);

  useEffect(() => {
    dispatch(daySortComment(day));
  }, [day]);

  return (
    <>
      <Menu style={{ marginBottom: '0' }} pointing secondary color="green">
        <Menu.Item
          active={active === 'mostRecent'}
          onClick={() => setActive('mostRecent')}
          header
        >
          <Icon
            name="fire"
            color={active === 'mostRecent' ? 'green' : 'blue'}
          />
          <Label color={active === 'mostRecent' ? 'green' : 'blue'} pointer>
            En Yeni
          </Label>
        </Menu.Item>
        <Menu.Item
          active={active === 'mostPast'}
          onClick={() => setActive('mostPast')}
          header
        >
          <Icon name="time" color={active === 'mostPast' ? 'green' : 'blue'} />
          <Label color={active === 'mostPast' ? 'green' : 'blue'} pointer>
            En Eski
          </Label>
        </Menu.Item>
        <Menu.Item
          active={active === 'mostPopular'}
          onClick={() => setActive('mostPopular')}
          header
        >
          <Icon
            name="paw"
            color={active === 'mostPopular' ? 'green' : 'blue'}
          />
          <Label color={active === 'mostPopular' ? 'green' : 'blue'} pointer>
            En Patili
          </Label>
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
              <Dropdown.Item
                text="Bu Hafta"
                onClick={() => setDay('lastWeek')}
              />
              <Dropdown.Item text="Bu Ay" onClick={() => setDay('lastMonth')} />
              <Dropdown.Item
                text="Tüm Zamanlar"
                onClick={() => setDay('allTime')}
              />
            </Dropdown.Menu>
          </StyledDropdown>
        </Menu.Item>
      </Menu>
    </>
  );
};

const daySortToText = (sort) => {
  if (sort === 'today') {
    return 'Bugün';
  } else if (sort === 'lastWeek') {
    return 'Bu Hafta';
  } else if (sort === 'lastMonth') {
    return 'Bu Ay';
  } else if (sort === 'allTime') {
    return 'Tüm Zamanlar';
  }
};

export default CommentSort;
