import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, StyledDropdown } from '../../../Nav/NavTheme';
import { changeSort } from '../../../../reducers/questionReducer';
import Filter from '../../../Filter/Filter';
import QuestionModal from './../Questions/QuestionModal';
import { commentSortToLabel } from '../../../Comments/CommentSort/CommentSort';

const QuestionsSort = () => {
  const filter = useSelector((state) => state.questions.filter);
  const dispatch = useDispatch();
  const [active, setActive] = useState(filter);
  useEffect(() => {
    dispatch(changeSort(active));
  }, [active]);
  return (
    <Menu
      style={{ marginBottom: '0' }}
      pointing
      secondary
      color="green"
      stackable
    >
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
        <QuestionModal />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item header>
          <Filter target="Soru" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default QuestionsSort;
