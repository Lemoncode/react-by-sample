# 08 Colorpicker



We will take a startup point sample _01 HelloReact_:

>This sample is based on the following [egghead jsbin](https://jsbin.com/qiwoxax/4/edit?html,js,output), but adding some variations.

Summary steps:

- Rename _hello.tsx_ file to _colorpicker.tsx_.
- Define the properties and state.
- Create the UI.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute `npm install`.

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

  ```jsx
  import * as React from 'react';

  export const ColorPicker = () => {
    return (
      <h2>Hello component !</h2>
    );
  }
  ```

- Let's create an indermediate _app.tsx_ file like we did in some previous samples:

  ```jsx
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
          <ColorPicker/>
        </div>
      );
    }
  }
  ```

- We need to update _main.tsx_ to indicate the change

```diff
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
-  import { HelloComponent } from './hello';
+  import {App} from './app';

  ReactDOM.render(
-   <HelloComponent/>  
+   <App/>,
    document.getElementById('root'));
```



- We are going to change as well the content of the file let's define a color and callback
as a property to setup the color (_colorpicker.tsx_).

```jsx
  import {Color} from './color'

  interface Props {
    color : Color;
    onColorUpdated : (color : Color) => void;
  }

  export const ColorPicker = (props : Props) => {
```

- Let's start by defining only one slider to control the red component of a given color (_colorpicker.tsx_).

  ```jsx
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

```diff
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
+          <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
+          <ColorPicker color={this.state.color}  onColorUpdated={this.setColorState.bind(this)}/>
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

```jsx
  export const ColorPicker = (props : Props) => {
    return (
      <div>
        <input type="range"
               min="0"
               max="255"
               value={props.color.red}
               onChange={(event : any) => props.onColorUpdated(
                 {
                   red: event.target.value,
                   green: props.color.green,
                   blue:  props.color.blue
                 }
               )}
        />
        {props.color.red}
        <br />
        <input type="range"
               min="0"
               max="255"
               value={props.color.green}
               onChange={(event : any) => props.onColorUpdated(
                 {
                   red:  props.color.red,
                   green: event.target.value,
                   blue: props.color.blue
                 }
               )}
        />
        {props.color.green}
        <br />
        <input type="range"
               min="0"
               max="255"
               value={props.color.blue}
               onChange={(event : any) => props.onColorUpdated(
                 {
                   red:   props.color.red,
                   green: props.color.green,
                   blue: event.target.value
                 }
               )}
        />
        {props.color.blue}
        <br />
      </div>
    );
  }
```

- Let's make this a bit more visual, it would be a good idea to display a rectangle
filled with the selected color. Let's create a ColorDisplayer component (_colordisplayer.tsx_).

```jsx
  import * as React from 'react';
  import {Color} from './color'

  interface Props {
    color : Color;
  }

  export const ColorDisplayer = (props : Props) => {
    // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
    // 'rgb(' + props.color.red + ', 40, 80)'
    var divStyle = {
      width: '120px',
      height: '80px',
      backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`
    };

    return (
      <div style={divStyle}>
      </div>
    );
  }
```

- And let's use it inside our App (_app.tsx_) component.

```diff
import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';
+  import {ColorDisplayer} from './colordisplayer';

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
+        <ColorDisplayer color={this.state.color} />      
        <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
        <ColorPicker color={this.state.color}  onColorUpdated={this.setColorState.bind(this)}/>
      </div>
    );
  }
}
```

- Let's give a try and check the results

 ```
npm start
```
