import * as React from 'react';
import {Color} from './color';

interface Props {
  value : number;
  onValueUpdated : (newValue : number) => void;
}

export const ColorSliderComponent = (props : Props) => {

  return (
    <div>
      <input type="range"
              min="0"
              max="255"
              value={props.value}
              onChange={(event : any) => props.onValueUpdated(event.target.value)}
      />
      {props.value}
    </div>
  );
}
