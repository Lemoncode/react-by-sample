# 08 Colorpicker



We will take a startup point sample _01 HelloReact_:

>This sample is based on the following [egghead jsbin](https://jsbin.com/qiwoxax/4/edit?html,js,output), but adding some variations.

Summary steps:

- Rename hello.tsx file to colorpicker.tsx.
- Define the properties and state.
- Create the UI.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute _npm install_.

- Let's define a proper color structure (create a _color.ts_ file).

```javascript
export interface Color {
  red : number;
  green : number;
  blue : number;
}
```

- Let's rename _hello.tsx_ to _colorpicker.tsx_.

- Let's rename as well the name of the component.

```javascript
import * as React from 'react';

export const ColorPicker = () => {
  return (
    <h2>Hello component !</h2>
  );
}
```

- Let's create an indermediate _app.tsx_ file like we did in some previous samples:

```javascript
import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';

interface State {
  color : Color;
}

export class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState(newColor : Color) {
    this.setState({color: newColor});
  }

  public render() {
      return (
       <div>
        <ColorPicker/>        
       </div>
      );
 }
}
```

- We need to update main.tsx to indicate the change

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';

ReactDOM.render(
  <App/>
  , document.getElementById('root'));
```



- We are going to change as well the content of the file let's define a color and callback
as a property to setup the color (_colorpicker.tsx_).

```javascript
import {Color} from './color'

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}


export const ColorPicker = (props) => {
```

- Let's start by defining only one slider to control the red component of a given color (_colorpicker.tsx_).

```javascript
export const ColorPicker = (props : Props) => {
  return (
    <div>
      <input type="range"
             min="0"
             max="255"
             value={props.color.red}
             onChange={(event : any) => props.onColorUpdated(
               {red: event.target.value, green: props.color.green, blue: props.color.blue}
             )}
      />
      {props.color.red}
    </div>
  );
}
```

- Now it's time to update _app.tsx_ to interact with the components props.

```javascript
import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';

interface State {
  color : Color;
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState(newColor : Color) {
    this.setState({color: newColor});
  }

  public render() {
      return (
       <div>
        <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
        <ColorPicker color={this.state.color}  onColorUpdated={this.setColorState.bind(this)}/>
       </div>
      );
 }
}

```

- Let's give a try and check that we got the basics working

```
npm start
```

- Let's complete the component by adding sliders for the green and blue options:

> Note: this will look a bit ugly, in the next sample we will refactor this to a cleaner solution

```javascript
export const ColorPicker = (props : Props) => {
  return (
    <div>
      <input type="range"
             min="0"
             max="255"
             value={props.color.red}
             onChange={(event : any) => props.onColorUpdated(
               {red: event.target.value, green: props.color.green, blue: props.color.blue}
             )}
      />
      {props.color.red}
      <br />
      <input type="range"
             min="0"
             max="255"
             value={props.color.green}
             onChange={(event : any) => props.onColorUpdated(
               {red: props.color.red, green: event.target.value, blue: props.color.blue}
             )}
      />
      {props.color.green}
      <br />
      <input type="range"
             min="0"
             max="255"
             value={props.color.blue}
             onChange={(event : any) => props.onColorUpdated(
               {red: props.color.red, green: props.color.green, blue: event.target.value}
             )}
      />
      {props.color.blue}
      <br />
    </div>
  );
}
```
