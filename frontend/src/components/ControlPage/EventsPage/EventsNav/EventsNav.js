import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, StyledDropdown } from '../../../Nav/NavTheme';
import Filter from '../../../Filter/Filter';
import EventModal from './EventModal';
import { daySortToText } from '../../../Comments/CommentSort/CommentSort';
import { changeDaySort } from '../../../../reducers/eventReducer';

const EventsNav = () => {
  const daySort = useSelector((state) => state.events.filter);
  const dispatch = useDispatch();
  const [day, setDay] = useState(daySort);

  useEffect(() => {
    dispatch(changeDaySort(day));
  }, [day]);

  return (
    <Menu
      style={{ marginBottom: '0' }}
      pointing
      secondary
      color="green"
      stackable
    >
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
            <Dropdown.Item text="Bu Hafta" onClick={() => setDay('nextWeek')} />
            <Dropdown.Item text="Bu Ay" onClick={() => setDay('nextMonth')} />
            <Dropdown.Item
              text="Tüm Zamanlar"
              onClick={() => setDay('allTime')}
            />
          </Dropdown.Menu>
        </StyledDropdown>
        <EventModal />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item header>
          <Filter target="Etkinlik" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default EventsNav;
