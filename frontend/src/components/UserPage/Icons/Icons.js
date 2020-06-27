import React from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';
import { changeIcon } from '../../../reducers/userReducer';
import { useDispatch } from 'react-redux';

const Icons = ({ user }) => {
  const dispatch = useDispatch();
  const icons = [
    {
      name: 'rocket',
      description: 'İlk yorumunu yaptın!',
      achievement: '1Comment',
    },
    {
      name: 'snowflake',
      description: '5 yorum yaptın!',
      achievement: '5Comment',
    },
    {
      name: 'trophy',
      description: '10 yorum yaptın!',
      achievement: '10Comment',
    },
    {
      name: 'chess king',
      description: '20 yorum yaptın!',
      achievement: '20Comment',
    },
    {
      name: 'chess rock',
      description: '50 yorum yaptın!',
      achievement: '50Comment',
    },
    {
      name: 'heart',
      description: '100 yorum yaptın!',
      achievement: '100Comment',
    },
    {
      name: 'shield',
      description: 'İlk kez patilendin!',
      achievement: '1Pati',
    },
    { name: 'gem', description: '10 kez patilendin!', achievement: '10Pati' },
    { name: 'magic', description: '50 kez patilendin!', achievement: '50Pati' },
    {
      name: 'leaf',
      description: '100 kez patilendin!',
      achievement: '100Pati',
    },
    {
      name: 'lemon',
      description: '200 kez patilendin!',
      achievement: '200Pati',
    },
    {
      name: 'fire',
      description: '500 kez patilendin!',
      achievement: '500Pati',
    },
    {
      name: 'flask',
      description: '1000 kez patilendin!',
      achievement: '1000Pati',
    },
    {
      name: 'chess knight',
      description: 'İlk tavsiyeni verdin!',
      achievement: '1Tip',
    },
    {
      name: 'chess pawn',
      description: '10 tavsive verdin!',
      achievement: '10Tip',
    },
    {
      name: 'quidditch',
      description: 'İlk sorunu sordun!',
      achievement: '1Question',
    },
    {
      name: 'chess bishop',
      description: '10 soru sordun!',
      achievement: '10Question',
    },
    { name: 'tint', description: 'Beta Tester', achievement: 'betaTester' },
    { name: 'bolt', description: 'Moderatör', achievement: 'mod' },
    { name: 'chess queen', description: 'Admin', achievement: 'admin' },
  ];
  const blueColor = '#2185d1';
  const greenColor = '#21BA45';

  const handleIcon = (iconName) => {
    dispatch(changeIcon(iconName));
  };

  return (
    <Grid columns="5">
      <Grid.Row>
        {icons.map((i) => {
          return (
            <Grid.Column
              key={i.name}
              style={{
                margin: '1em 1em',
              }}
            >
              <Popup
                content={i.description}
                position="bottom center"
                trigger={
                  <Icon
                    onClick={() => handleIcon(i.name)}
                    name={i.name}
                    color={user.iconName === i.name ? 'green' : 'blue'}
                    size="big"
                    bordered
                    style={{
                      boxShadow: `0em 0em 0em 0.1em ${
                        user.iconName === i.name ? greenColor : blueColor
                      } inset`,
                    }}
                  />
                }
              />
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  );
};

export default Icons;
