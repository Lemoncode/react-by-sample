# 13 ShouldUpdate

In this sample we will enhance rendering performance hooking to 'shouldComponentUpdate'.

We are going to implement a customer satisfaction widget, based on smily faces,
it will accept a range value (0 to 500), and the faces will have a range of values
0..100, 100..200, 200..300, 300..400, 400..500. We will only fire the render option whenever
the value jumps into the next or previous range.

We will take a startup point sample _03 State_:

## Summary steps:

- Remove _hello_ and _nameEdit_ components (app cleanup).
- Copy under dir _content_ the four png's that contain the simleys.
- Create under dir _content_ a _site.css_ file and define stlyes for the smileys.
- Create a smily component.
- Add to app state a currenValue entry, pass it to the control plus, add an slider to configure it.
- Let's add an optimization... componentshouldupdate.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute:

```
npm install
```

- Let's make a cleanup on _app.tsx_

_./src/app.tsx_

```jsx
import * as React from 'react';

interface Props {
}

interface State {
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
      </div>
    );
  }
}
```

- Let's create a folder _src/content_ and copy the five smiley faces (you can
  copy them from the sample implementation in github).

- Let's create a css file: _src/content/site.css_ and add the smileys styles:

_./src/content/site.css_

```css
.very-dissatisfied {
  width:100%;
  height:80px;
  background:url('./one.png') no-repeat;;
}

.somewhat-dissatisfied {
  width:100%;
  height:80px;
  background:url('./two.png') no-repeat;
}

.neither {
  width:100%;
  height:80px;
  background:url('./three.png') no-repeat;
}

.somewhat-satisfied {
  width:100%;
  height:80px;
  background:url('./four.png') no-repeat;
}

.very-satisfied {
  width:100%;
  height:80px;
  background:url('./five.png') no-repeat;
}
```

- You can copy this images into the _content_ folde, url where you can download them: https://github.com/Lemoncode/react-by-sample/tree/master/13%20ShouldUpdate/src/content

- In _webpack.config.js_ let's add the new _css_ file as entry point:

_webpack.config.js_

```diff
entry: [
  '@babel/polyfill',
  './main.tsx',
+  './content/site.css'
],
```

- Let's create a simple _faceComponent_ under _src_, we will start by just adding something hardcoded in file _src/face.tsx_:

_./src/face.tsx_

```jsx
import * as React from 'react';

export const FaceComponent = (props : {level : number}) => {
  return (
    <div className="somewhat-satisfied"/>
  );
}
```

- Let's make a quick test on _app.tsx_

_./src/app.tsx_

```diff
import * as React from 'react';
+ import { FaceComponent } from './face';

interface Props {
}

interface State {
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
+        <FaceComponent level={100}/>
      </div>
    );
  }
}
```

- Let's make a check point and run the sample: check that is working as expected.

```
npm start
```

- Now it's time to link the property with the proper faces, let's create a style function for that in _face.tsx_

_./src/face.tsx_

```diff
import * as React from 'react';

+ const setSatisfactionClass = (level : number) => {
+  if(level < 100) {
+        return "very-dissatisfied"
+  }
+
+  if(level < 200) {
+        return "somewhat-dissatisfied"
+  }
+
+  if(level < 300) {
+        return "neither"
+  }
+
+  if(level < 400) {
+        return "somewhat-satisfied"
+  }
+
+  return "very-satisfied"
+}


export const FaceComponent = (props : {level : number}) => {
  return (
-    <div className="somewhat-satisfied"/>
+    <div className={setSatisfactionClass(props.level)}/>
  );
}
```

- In _app.tsx_ let's add a state variable to hold the current satisfaction level plus
an slider to let the user update it.

_./src/app.tsx_

```diff
import * as React from 'react';
import { FaceComponent } from './face'

interface Props {
}

+ interface State {
+  satisfactionLevel : number;
+ }

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

+    this.state = {satisfactionLevel: 300};
  }

  public render() {
    return (
      <div>
+        <input type="range"
+                min="0"
+                max="500"
+                value={this.state.satisfactionLevel}
+                onChange={(event : any) => this.setState(
+                {satisfactionLevel:event.target.value} as State)}
+        />
+        <br/>
+        <span>{this.state.satisfactionLevel}</span>
+        <br/>
-        <FaceComponent level={100}/>
+        <FaceComponent level={this.state.satisfactionLevel}/>
      </div>
    );
  }
}
```

- Let's run the sample:

  ```
  npm start
  ```

- Let's add a rendering optimization, we should only trigger the render whenever
the level just changes the satisfaction range, we need to move the component to state component:

_./src/face.tsx_

```diff
import * as React from 'react';

+ interface Props {
+   level : number;
+ }

+  const isRangeChange = (oldValue : number, newValue : number) => {
+    const oldValueClass = setSatisfactionClass(oldValue); 
+    const newValueClass = setSatisfactionClass(newValue);
+
+    return oldValueClass !== newValueClass;     
+  }

+ export class FaceComponent extends React.Component<Props, {}> {
- export const FaceComponent = (props: { level: number }) => {

+  shouldComponentUpdate(nextProps : Props, nextState)
+  {
+    return isRangeChange(this.props.level, nextProps.level);
+  }

+  render() {
    return (
-      <div className={this.setSatisfactionClass(props.level)}/>
+       <div className={this.setSatisfactionClass(this.props.level)}/>
    );
+  }
}
```

> Excercise there's an easier way to implement the same algorithm in the should component update.

- Now if we place a breakpoint in the faceComponent render method we can see that
render is only triggered when you change from a satisfaction range (e.g. 99 to 100).

```
npm start
```
