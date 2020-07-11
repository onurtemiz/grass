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
        padding: '1em',
      }}
    >
      {isMobile ? (
        <Button as="a" style={{ backgroundColor: '#e85b46' }}>
          <a
            href="https://www.patreon.com/bePatron?u=38417344"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <Icon name="patreon" />
          </a>
        </Button>
      ) : (
        <Button as="a" style={{ backgroundColor: '#e85b46' }}>
          <a
            href="https://www.patreon.com/bePatron?u=38417344"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            Destek olun!
          </a>
        </Button>
      )}
    </div>
  );
};

export default Patreon;
