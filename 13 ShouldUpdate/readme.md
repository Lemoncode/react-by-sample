# 03 State

In this sample we will enhance rendering performance hooking to 'shouldComponentUpdate'.

We are going to implement a customer satisfaction widget, based on smily faces,
it will accept a range value (0 to 50), and the faces will have a range of values
0..10, 10..20, 20..30, 30..40, 40..50. We will only fire the render option whenever
the value jumps into the next or previous range.

We will take a startup point sample _03 State_:

Summary steps:

- Remove hello and nameEdit components (app cleanup).
- Copy under _content_ the four png's that contain the simleys.
- Create under _content_ a _site.css_ file and define stlyes for the smileys.
- Create a smily component.
- Add to app state a currenValue entry, pass it to the control plus add an slider
to configure it.
- Let's add an optimization... componentshouldupdate.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute _npm install_.

- Remove _nameEdit.ts_ and _hello.tsx_, let's wipe them from _app.tsx_ as well:

```javascript
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

- In _webpack.config.js_ let's add the new _css_ file as entry point:

```javascript
entry: [
  './main.tsx',
  '../node_modules/bootstrap/dist/css/bootstrap.css',
  './content/site.css'
],
```

- We need to add as well a loder to handle images in _webpackconfig.js

```javascript
{
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000'
},      
```

- Let's create a simple _faceComponent_ under _src_, we will start by just adding
something hardcoded:

```javascript
import * as React from 'react';

export const faceComponent = (props : {level : number}) => {
  return (
    <div className="somewhat-satisfied"/>
  );

```

- Let's make a quick test on _app.tsx_

```javascript
import * as React from 'react';
import {FaceComponent} from './face'

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
          <FaceComponent level ={100}/>
       </div>
      );
 }
}
```

- Let's make a check point and run the sample: check that is working as expected.

```
npm start
```

- Now it's time to link the property with the proper faces, let's create a style function
for that in _face.tsx_

```javascript
export const FaceComponent = (props : {level : number}) => {
  function setSatisfactionClass(level : number) {
    if(level < 100) {
          return "very-dissatisfied"
    }

    if(level < 200) {
          return "somewhat-dissatisfied"
    }

    if(level < 300) {
          return "neither"
    }

    if(level < 400) {
          return "somewhat-satisfied"
    }

    return "very-satisfied"
  }

  return (
    <div className={setSatisfactionClass(props.level)}/>
  );
}
```

- In _app.tsx_ let's add a state variable to hold the current satisfaction level plus
an slider to let the user update it.

```
import * as React from 'react';
import {FaceComponent} from './face'

interface Props {
}

interface State {
  satisfactionLevel : number;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {satisfactionLevel: 300};
  }
  public render() {
      return (
       <div>
         <input type="range"
                min="0"
                max="500"
                value={this.state.satisfactionLevel}
                onChange={(event : any) => this.setState({satisfactionLevel :event.target.value} as State)}
         />
         <br/>
         <span>{this.state.satisfactionLevel}</span>
         <br/>
         <FaceComponent level ={this.state.satisfactionLevel}/>
       </div>
      );
 }
}
```

- Let's run the sample:

```
npm startup
```

- Let's add a rendering optimization, we should only trigger the render whenever
the level just changes the satisfaction range, we need to move the component to
state component:

```javascript
import * as React from 'react';

interface Props {
  level : number;
}

export class FaceComponent extends React.Component<Props, {}> {

  setSatisfactionClass(level : number) {
    if(level < 100) {
          return "very-dissatisfied"
    }

    if(level < 200) {
          return "somewhat-dissatisfied"
    }

    if(level < 300) {
          return "neither"
    }

    if(level < 400) {
          return "somewhat-satisfied"
    }

    return "very-satisfied"
  }

  shouldComponentUpdate(nextProps : Props, nextState)
  {
    const rangeChange = [100, 200, 300, 400];

    let index =  0;
    let isRangeChange = false;

    while(!isRangeChange && index < rangeChange.length) {
      isRangeChange = (this.props.level < rangeChange[index] && nextProps.level >= rangeChange[index])
                    ||
                      (this.props.level > rangeChange[index] && nextProps.level <= rangeChange[index])
      ;

      index++;
    }

     return isRangeChange;
  }

  render() {
    return (
      <div className={this.setSatisfactionClass(this.props.level)}/>
    );
  }
}
```


- Now if we place a breakpoint in the faceComponent render method we can see that
render is only triggered when you change from a satisfaction range (e.g. 99 to 100).

```
npm start
```
