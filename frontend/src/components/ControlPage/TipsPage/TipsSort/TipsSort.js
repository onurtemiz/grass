import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, StyledDropdown } from '../../../Nav/NavTheme';
import { changeSort } from '../../../../reducers/tipReduer';
import Tips from '../../../HomePage/Home/Tips';
import { commentSortToLabel } from '../../../Comments/CommentSort/CommentSort';

const TipsSort = () => {
  const filter = useSelector((state) => state.tips.filter);
  const dispatch = useDispatch();
  const [active, setActive] = useState(filter);
  useEffect(() => {
    dispatch(changeSort(active));
  }, [active]);
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
      <Menu.Item header>
        <Tips />
      </Menu.Item>
    </Menu>
  );
};

export default TipsSort;
