# 09 Colorpicker Refactor

In this example we are going to review the colorpicker component we have created and simplify it. Right now we have three slider controls with many details that make our HTML hard to read. Let's componentize this scenario.

We take _08 Colorpicker_ as reference.

## Summary steps:

- Create a simple color slider component.
- Replace the color slider inputs with the new slider.
- Check the result.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _08 ColorPicker_ and execute `npm install`.

- Let's define a ColorSliderComponent component (_colorslider.tsx_).

_./src/colorslider.tsx_

```jsx
import * as React from 'react';
import { Color } from './color';

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
```

- Let's refactor our _colorpicker.tsx_.

```diff
import * as React from 'react';
import { Color } from './color';
+ import { ColorSliderComponent } from './colorslider';

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}
  
export const ColorPicker = (props : Props) => {
  return (
    <div>
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.red}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:  props.color.red,
-                  green: event.target.value,
-                  blue: props.color.blue
-                }
-              )}
-      />
-      {props.color.green}
+        <ColorSliderComponent
+          value = {props.color.red}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red: value,
+              green: props.color.green,
+              blue:  props.color.blue
+            })
+          }
+        />
      <br />
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.green}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:  props.color.red,
-                  green: event.target.value,
-                  blue: props.color.blue
-                }
-              )}
-      />
-      {props.color.green}     
+        <ColorSliderComponent
+          value = {props.color.green}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red:  props.color.red,
+              green: value,
+              blue: props.color.blue
+            })
+          }
+        />
       <br />
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.blue}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:   props.color.red,
-                  green: props.color.green,
-                  blue: event.target.value
-                }
-              )}
-      />
-      {props.color.blue}
+        <ColorSliderComponent
+          value = {props.color.blue}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red:   props.color.red,
+              green: props.color.green,
+              blue: value
+            })
+          }
+        />
      <br />           
    </div>    
  );
}
```

- Let's give it a try and check it works as expected.

  ```
  npm start
  ```
  
- We have still room for improvement. What about using a single handler for all colors? If we currify the colorupdated handler, then we can!

_./src/colorpicker.tsx_

```diff
import * as React from 'react';
import { Color } from './color'
import { ColorSliderComponent } from './colorslider';

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}

+ const updateColor = (props : Props, colorId : keyof Color) => (value) => {  // keyof Color ensures only 'red', 'blue' or 'green' can be passed in.
+    props.onColorUpdated({
+      ...props.color,   // this creates a clone of the current props.color object...
+      [colorId]: value  // ... which gets one of its properties (colorId) immediately replaced by a new value.
+    });
+ };

export const ColorPicker = (props: Props) => {
  return (
    <div>
      <ColorSliderComponent
      value = {props.color.red}
+      onValueUpdated={updateColor(props, 'red')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red: value,
-          green: props.color.green,
-          blue:  props.color.blue
-        })
-      }
    />
    <br />
    <ColorSliderComponent
      value = {props.color.green}
+      onValueUpdated={updateColor(props, 'green')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red:  props.color.red,
-          green: value,
-          blue: props.color.blue
-        })
-      }
    />
    <br />
    <ColorSliderComponent
      value = {props.color.blue}
+      onValueUpdated={updateColor(props, 'blue')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red:   props.color.red,
-          green: props.color.green,
-          blue: value
-        })
-      }
    />
    <br />
    </div>
  );
}
```

- Let's give it a try:

```
npm start
```
