# 03 Sidebar

In this sample we are going to implement a single sidebar.

We will take a startup point sample _03 State_:

Summary steps:

- Add some styles.
- Include the new css into the webpack loop.
- Create a sidebar component.
- Let's add some content to the sidebar.
- Add a button to open / close the sidebar.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute `npm install`.

- Create a file called src/styles.css and add the following styles (http://www.w3schools.com/howto/howto_js_sidenav.asp):

```css
/* The side navigation menu */
.sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #808080; /* Gray*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}


/* Position and style the close button (top right corner) */
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
    transition: margin-left .5s;
    padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
}
```

- Add this css file to the webpack entry point:

  ```javascript
  entry: [
    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    './styles.css'
  ],
  ```

- We are going to create now a sidebar component, _src/sidebar.tsx_. Right now we will create just
a rectangle and we will interact with the animation.

  ```jsx
  import * as React from 'react';

  export const SidebarComponent = () => {
    return (
      <div id="mySidenav" className="sidenav">
          <span>Basic side bar, first steps</span>
      </div>
    );
  }
  ```

- We are going to add a known id to to body section of _src/index.html_ page

  ```html
  <body id="main">
  ```

- Let's place the component adding into the app.tsx:

```jsx
import {SidebarComponent} from './sidebar';
```

```jsx
return (
  <div>
    <SidebarComponent/>
    <HelloComponent userName={this.state.userName} />
    <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState.bind(this)} />
  </div>
);
```

- Now is time to run the app, just to check we haven't broken anything (but you will see no results).

```
npm start
```

- Let's start with the interesting part of this implementation, let's add a flag to show/hide the
sidebar _sidebar.tsx_.

```jsx
export const SidebarComponent = (props: {isVisible : boolean}) => {
  return (
    <div id="mySidenav" className="sidenav">
      <span>Basic side bar, first steps</span>
    </div>
  );
}
```

- Now let's add some logic to show / display the sidebar in case the flag gets
updated

```jsx
export const SidebarComponent = (props: {isVisible : boolean}) => {
  var divStyle = {
    width: (props.isVisible) ?  '250px':'0px'
  };

  return (
    <div id="mySidenav" className="sidenav" style={divStyle}>
      <span>Basic side bar, first steps</span>
    </div>
  );
}
```

- Now at app level (in file _app.tsx_) we can add a new member to the state (a boolean flag) and a button to turn it
off and on.

```javascript
interface State {
  userName : string;
  isSidebarVisible : boolean;
}
```

```jsx
export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {userName: "defaultUserName", isSidebarVisible: false};
  }

  setUsernameState(event) {
    this.setState({userName: event.target.value} as State);
  }

  toggleSidebarVisibility() {
    const newVisibleState = !this.state.isSidebarVisible;

    this.setState({isSidebarVisible: newVisibleState} as State);
  }

  ButtonStyle = {
     marginLeft: '450px'
   };

  public render() {
    return (
      <div>
        <SidebarComponent isVisible={this.state.isSidebarVisible} />
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState.bind(this)} />
        <input type="submit"
          value="Toggle Sidear"
          className="btn btn-default"
          style={this.ButtonStyle}
          onClick={this.toggleSidebarVisibility.bind(this)}
          />
      </div>
    );
  }
}
```

- If we run our sample, we can see how the sidebar is shown / hidden.

- So far so good, but what happens if we want to make this sidebar a reusable component, we could
just show the frame but the content should be dynamic.

- Let's start by adding some content when instantiating the sidebar (_app.tsx_).

```jsx
<SidebarComponent isVisible={this.state.isSidebarVisible}>
  <h1>Test content</h1>
</SidebarComponent>
```

- Now in the _sidebar.tsx_ let's dump this content by using {this.props.children}

```javascript
import * as React from 'react';

interface Props {
  isVisible : boolean;
}

interface State {
  divStyle : Object;
}

export class SidebarComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      divStyle: {
        width: '0px'
      }
    };
  }

  public componentWillReceiveProps(nextProps)
  {
    if(this.props.isVisible != nextProps.isVisible) {
      const widthValue = (nextProps.isVisible) ? '250px':'0px';
      // TODO we could remove this and try to use single source of truth
      // a function that just calculates the value based on the visible flag
      this.setState({divStyle: {width: widthValue}});
    }
  }

  public render() {
    return (
      <div id="mySidenav" className="sidenav" style={this.state.divStyle}>
        {this.props.children}
      </div>
    );
  }
}
```
