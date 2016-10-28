# 09 Colorpicker Refactor

In this sample we are going to review the colorpicker component we have created
and simplify it, right now we have three slider controls with many details
that make our HTML hard to read, let's componentize this scenario.

We will take a startup point sample _08 Colorpicker_:

Summary steps:

- Create a simple color slide component.
- Replace the color slider inputs with the new slider.
- Check result.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _08 ColorPicker_ and execute `npm install`.

- Let's define a ColorSlider component (_colorslider.tsx_).

  ```jsx
  import * as React from 'react';
  import {Color} from './color';

  interface Props {
    value : number;
    onValueUpdated : (newValue : number) => void;
  }

  export const ColorSlider = (props : Props) => {

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
  ```

- Let's refactor our _colorpicker.tsx_.

  ```jsx
  import {ColorSlider} from './colorslider';
  ```

  ```jsx
  export const ColorPicker = (props : Props) => {
    return (
      <div>
        <ColorSlider
          value = {props.color.red}
          onValueUpdated={(value) => props.onColorUpdated(
            {
              red: value,
              green: props.color.green,
              blue:  props.color.blue
            })
          }
        />
        <br />
        <ColorSlider
          value = {props.color.green}
          onValueUpdated={(value) => props.onColorUpdated(
            {
              red:  props.color.red,
              green: value,
              blue: props.color.blue
            })
          }
        />
        <br />
        <ColorSlider
          value = {props.color.blue}
          onValueUpdated={(value) => props.onColorUpdated(
            {
              red:   props.color.red,
              green: props.color.green,
              blue: value
            })
          }
        />
      </div>
    );
  }
  ```

- Let's give a try and check that everything is still working as expected.

  ```
  npm start
  ```
