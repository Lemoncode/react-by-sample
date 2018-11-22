import * as React from 'react';
import { Color } from './color'
import { ColorSliderComponent } from './colorslider';

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}

const updateColor = (props: Props, colorId: keyof Color) => (value) => {  // keyof Color ensures only 'red', 'blue' or 'green' can be passed in.
  props.onColorUpdated({
    ...props.color,   // this creates a clone of the current props.color object...
    [colorId]: value  // ... which gets one of its properties (colorId) immediately replaced by a new value.
  });
};


export const ColorPicker = (props: Props) => {
  return (
    <div>
      <ColorSliderComponent
        value={props.color.red}
        onValueUpdated={
          updateColor(props, 'red')
        }
      />
      <br />
      <ColorSliderComponent
        value={props.color.green}
        onValueUpdated={
          updateColor(props, 'green')
        }
      />
      <br />
      <ColorSliderComponent
        value={props.color.blue}
        onValueUpdated={
          updateColor(props, 'blue')
        }
      />
      <br />
    </div>
  );
}