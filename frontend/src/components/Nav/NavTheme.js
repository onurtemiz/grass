import Search from '../Search/Search';
import styled from 'styled-components';
import Slider, { Range } from 'rc-slider';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

export const InfiniteListStyle = !isMobile
  ? { minHeight: '300px', maxHeight: '500px', overflow: 'auto' }
  : null;

export const NavSearch = styled.div`
  .ui.search .prompt {
    border-radius: 0rem;
  }
  .input {
    min-width: 300px;
  }
  .results {
    min-width: 300px;
    font-weight: bold;
  }
`;

export const StyledRange = styled(Range)`
  .rc-slider-handle {
    background-color: #2185d0;
    border-color: #2185d0;
  }
  .rc-slider-handle:active {
    box-shadow: 0 0 5px #2185d0;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    background-color: #2185d0;
    border-color: #2185d0;
    box-shadow: 0 0 5px #2185d0;
  }
`;

export const StyledSlider = styled(Slider)`
  .rc-slider-handle {
    background-color: #2185d0;
    border-color: #2185d0;
  }
  .rc-slider-handle:active {
    box-shadow: 0 0 5px #2185d0;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    background-color: #2185d0;
    border-color: #2185d0;
    box-shadow: 0 0 5px #2185d0;
  }
`;

export const HeadingStyle = {
  fontSize: '2em',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  alignItems: 'center',
};

export const HeadingStyleMobile = {
  display: 'flex',
  fontSize: '2em',
  flexDirection: 'column',
};

export const StyledDropdown = styled(Dropdown)`
  .dropdown.icon {
    color: #2185d0;
  }
`;

export const Label = styled.label`
  color: ${(props) =>
    props.color === 'green'
      ? '#21ba45'
      : props.color === 'blue'
      ? '#2185d0 !important'
      : props.color === 'red'
      ? '#db2828'
      : props.color === 'hot red'
      ? '#F44336'
      : props.color === 'white'
      ? '#FFF'
      : '#333'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'auto')};
  font-weight: ${(props) => (props.bold ? 'bold' : 'auto')};
  &:hover {
    filter: ${(props) =>
      props.pointer && !props.nolink ? 'brightness(110%)' : null};
  }
`;

export const GreenLabel = styled.label`
  color: #21ba45;
  cursor: pointer;
`;

export const BlueLabel = styled.label`
  color: #21ba45;
  cursor: pointer;
`;
