import React, { useState, useEffect } from 'react';
import { Grid, Icon, Popup, Button } from 'semantic-ui-react';
import { changeIcon, checkAchievement } from '../../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

const Icons = ({ user }) => {
  useEffect(() => {
    dispatch(checkAchievement());
  }, []);
  const dispatch = useDispatch();
  const icons = [
    {
      name: 'chess pawn',
      description: 'İlk yorumunu yaptın!',
      achievement: 'comment1',
    },
    {
      name: 'chess bishop',
      description: '5 yorum yaptın!',
      achievement: 'comment5',
    },
    {
      name: 'chess knight',
      description: '10 yorum yaptın!',
      achievement: 'comment10',
    },
    {
      name: 'chess rock',
      description: '20 yorum yaptın!',
      achievement: 'comment20',
    },
    {
      name: 'chess king',
      description: '50 yorum yaptın!',
      achievement: 'comment50',
    },
    {
      name: 'chess queen',
      description: '100 yorum yaptın!',
      achievement: 'comment100',
    },

    {
      name: 'bolt',
      description: 'İlk kez patilendin!',
      achievement: 'pati1',
    },
    {
      name: 'paper plane',
      description: '10 kez patilendin!',
      achievement: 'pati10',
    },
    {
      name: 'plane',
      description: '50 kez patilendin!',
      achievement: 'pati50',
    },
    {
      name: 'fighter jet',
      description: '100 kez patilendin!',
      achievement: 'pati100',
    },
    {
      name: 'space shuttle',
      description: '200 kez patilendin!',
      achievement: 'pati200',
    },
    {
      name: 'rocket',
      description: '500 kez patilendin!',
      achievement: 'pati500',
    },
    {
      name: 'quidditch',
      description: '1000 kez patilendin!',
      achievement: 'pati1000',
    },

    {
      name: 'leaf',
      description: 'İlk tavsiyeni verdin!',
      achievement: 'tip1',
    },
    {
      name: 'tree',
      description: '10 tavsive verdin!',
      achievement: 'tip10',
    },
    {
      name: 'gem',
      description: 'İlk sorunu sordun!',
      achievement: 'question1',
    },
    {
      name: 'tint',
      description: '10 soru sordun!',
      achievement: 'question10',
    },
    { name: 'cogs', description: 'Beta Tester', achievement: 'betaTester' },
    { name: 'shield', description: 'Moderatör', achievement: 'mod' },
    { name: 'user secret', description: 'Admin', achievement: 'admin' },
  ];
  const blueColor = '#2185d1';
  const greenColor = '#21BA45';

  const handleIcon = (iconName, iconCode) => {
    dispatch(changeIcon(iconName, iconCode));
  };

  if (!user.achievements) {
    return <LinearProgress />;
  }

  return (
    <Grid columns="6">
      <Grid.Row>
        {icons.map((i) => {
          return (
            <Grid.Column
              key={i.name}
              verticalAlign="middle"
              style={{ marginLeft: '0.5em', marginTop: '1em' }}
            >
              <Popup
                content={i.description}
                position="bottom center"
                trigger={
                  <Icon
                    onClick={() => handleIcon(i.name, i.achievement)}
                    name={i.name}
                    color={user.iconName === i.name ? 'green' : 'blue'}
                    size="big"
                    bordered
                    disabled={!user.achievements[`${i.achievement}`]}
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
