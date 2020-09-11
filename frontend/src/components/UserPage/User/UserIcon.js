import React, { useState, useEffect } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const UserIcon = ({ iconName, themeColor, achievement }) => {
  const [selectedIconName, setSelectedIconName] = useState(iconName);
  useEffect(() => {
    if (achievement) {
      const icon = Object.keys(icons).find(
        (key) => icons[key].achievement === achievement
      );
      setSelectedIconName(icon);
    }
  }, []);

  return (
    <>
      {selectedIconName ? (
        <Popup
          content={icons[selectedIconName].description}
          trigger={<Icon color={themeColor} name={selectedIconName} fitted />}
          inverted
          on={['hover']}
          position="top left"
          size="mini"
          offset="-9px, 0"
        />
      ) : (
        <></>
      )}
    </>
  );
};

const icons = {
  'chess pawn': {
    description: 'İlk yorumununu yaptı!',
    achievement: 'comment1',
  },
  'chess bishop': {
    description: '5. yorumunu yaptı!',
    achievement: 'comment5',
  },
  'chess knight': {
    description: '10. yorumunu yaptı!',
    achievement: 'comment10',
  },
  'chess rock': {
    description: '20. yorumunu yaptı!',
    achievement: 'comment20',
  },
  'chess king': {
    description: '50. yorumunu yaptı!',
    achievement: 'comment50',
  },
  'chess queen': {
    description: '100. yorumunu yaptı!',
    achievement: 'comment100',
  },

  bolt: {
    description: 'İlk kez patilendi!',
    achievement: 'pati1',
  },
  'paper plane': {
    description: '10 kez patilendi!',
    achievement: 'pati10',
  },
  plane: {
    description: '20 kez patilendi!',
    achievement: 'pati20',
  },
  'fighter jet': {
    description: '50 kez patilendi!',
    achievement: 'pati50',
  },
  'space shuttle': {
    description: '100 kez patilendi!',
    achievement: 'pati100',
  },
  rocket: {
    description: '200 kez patilendi!',
    achievement: 'pati200',
  },
  quidditch: {
    description: '500 kez patilendi!',
    achievement: 'pati500',
  },
  rebel: {
    description: '1000 kez patilendi!',
    achievement: 'pati1000',
  },

  leaf: {
    description: 'İlk tavsiyesini verdi!',
    achievement: 'tip1',
  },
  lemon: {
    description: '5 tavsiye verdi!',
    achievement: 'tip5',
  },
  tree: {
    description: '10 tavsive verdi!',
    achievement: 'tip10',
  },

  tint: {
    description: 'İlk sorusunu sordu!',
    achievement: 'question1',
  },
  snowflake: {
    description: '5 soru sordu!',
    achievement: 'question5',
  },
  gem: {
    description: '10 soru sordu!',
    achievement: 'question10',
  },
  patreon: { description: 'Patreon Destekçisi', achievement: 'patreon' },

  cogs: { description: 'Beta Tester', achievement: 'betaTester' },
  shield: { description: 'Moderatör', achievement: 'mod' },
  'user secret': { description: 'Admin', achievement: 'admin' },
};
export default UserIcon;
