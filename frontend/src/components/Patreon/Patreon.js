import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

const Patreon = () => {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '999',
        bottom: '0',
        right: '0',
      }}
    >
      {isMobile ? (
        <Button
          as="a"
          style={{ backgroundColor: '#e85b46', padding: '1em', color: 'white' }}
          href="https://www.patreon.com/bePatron?u=38417344"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="patreon" />
        </Button>
      ) : (
        <Button
          as="a"
          style={{ backgroundColor: '#e85b46', margin: '1em', color: 'white' }}
          href="https://www.patreon.com/bePatron?u=38417344"
          target="_blank"
          rel="noopener noreferrer"
        >
          Destek olun!
        </Button>
      )}
    </div>
  );
};

export default Patreon;
