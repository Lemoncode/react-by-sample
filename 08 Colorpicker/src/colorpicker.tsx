import * as React from 'react';
import {Color} from './color'

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}

export const ColorPicker = (props : Props) => {
  return (
    <div>
      <input type="range"
             min="0"
             max="255"
             onChange={(event : any) => props.onColorUpdated(
               {red: event.target.value, green: props.color.green, blue: props.color.blue}
             )}
      />
      {props.color.red}
    </div>
  );
}
