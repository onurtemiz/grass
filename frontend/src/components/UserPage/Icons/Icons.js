import React, { useState, useEffect } from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';
import { changeIcon, checkAchievement } from '../../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import usersService from '../../../services/user';

const Icons = ({ user }) => {
  const [achievements, setAchievements] = useState([]);
  useEffect(() => {
    dispatch(checkAchievement());
  }, [achievements]);

  useEffect(() => {
    const getAchievements = async () => {
      const allAchievements = await usersService.getAchievement();
      setAchievements(allAchievements.icons);
    };
    getAchievements();
  }, []);
  const dispatch = useDispatch();

  const blueColor = '#2185d1';
  const greenColor = '#21BA45';

  const handleIcon = (iconName, iconCode) => {
    dispatch(changeIcon(iconName, iconCode));
  };
  if (!user.achievements || !achievements.length > 0) {
    return <LinearProgress />;
  }

  return (
    <Grid columns="6">
      <Grid.Row>
        {achievements.map((i) => {
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
