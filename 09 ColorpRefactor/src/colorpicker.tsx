import * as React from 'react';
import {Color} from './color'
import {ColorSlider} from './colorslider'

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}

export const ColorPicker = (props : Props) => {
  return (
    <div>
      <ColorSlider
        value = {props.color.red}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: value, green: props.color.green, blue: props.color.blue}) }
      />
      <br />
      <ColorSlider
        value = {props.color.green}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: props.color.red, green: value, blue: props.color.blue}) }
      />
      <br />
      <ColorSlider
        value = {props.color.blue}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: props.color.red, green: props.color.green, blue: value}) }
      />
    </div>
  );
}
