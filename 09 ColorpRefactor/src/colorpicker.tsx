import * as React from 'react';
import { ColorSliderComponent } from './colorslider';

import { Color } from './color'

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}


const updateColor = (props: Props, colorId: keyof Color) => (value) => {
  props.onColorUpdated({
    ...props.color,
    [colorId]: value
  });
};



export const ColorPicker = (props: Props) => {
  return (
    <div>
      <ColorSliderComponent
        value={props.color.red}
        onValueUpdated={updateColor(props, 'red')}
      />
      <br />
      <ColorSliderComponent
        value={props.color.green}
        onValueUpdated={updateColor(props, 'green')}
      />
      <br />
      <ColorSliderComponent
        value={props.color.blue}
        onValueUpdated={updateColor(props, 'blue')}        
      />
      <br />
    </div>
  );
}