import { Search, Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';
export const HomeSearch = styled(Search)`
  .input {
    width: 75vw;
    max-width: 1000px;
    min-width: 300px;
  }

  .results {
    margin-left: 12.5vw;
    min-width: 300px;
    max-width: 1000px;
    width: 100vw !important;
    color: palevioletred !important;
    font-weight: bold;
  }
`;

export const HomeGrid = styled(Grid)`
  height: 60vh;
`;

export const HomeHeader = styled(Header)`
  font-size: 5em;
  color: #21ba45;
`;
