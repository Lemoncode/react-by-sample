import * as React from 'react';
import {Color} from './color'

interface Props {
  color : Color;
}

export const ColorDisplayer = (props : Props) => {
  
  const divStyle : React.CSSProperties =  { // React.CSSProperties gives editing-time visual feedback on the CSS you are typing.
    width: '11rem',
    height: '7rem',
    backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`
  };


  return (
    <div style={divStyle}>
    </div>
  );
}
