import React from 'react';
import { Button } from 'semantic-ui-react';

const Patreon = () => {
  return (
    <div style={{ position: 'fixed', bottom: '0', right: '0', padding: '1em' }}>
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
    </div>
  );
};

export default Patreon;
