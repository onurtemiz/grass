import Search from '../Search/Search';
import styled from 'styled-components';
import Slider, { Range } from 'rc-slider';

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
      : '#333'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'auto')};
  font-weight: ${(props) => (props.bold ? 'bold' : 'auto')};
  &:hover {
    filter: ${(props) => (props.pointer ? 'brightness(110%)' : null)};
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
