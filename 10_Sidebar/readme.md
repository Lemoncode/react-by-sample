# 10 Sidebar

In this sample we are going to implement a single sidebar.

We will take a startup point sample _03 State_:

## Summary steps:

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

- Create a file called _src/sidebar.css_ and add the following styles (http://www.w3schools.com/howto/howto_js_sidenav.asp):

_./src/sidebar.css_

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

- We are going to use CSS Modules, so let's configure it.

_./webpack.config.js_

```diff
  module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
-      extensions: ['.js', '.ts', '.tsx']
+      extensions: ['.js', '.ts', '.tsx', '.css']
    },
```

- We will only use CSS Modules for custom app stylesheets. We will not use CSS Modules for other CSS files, like Bootstrap (folder node_modules).

_./webpack.config.js_

```diff
  {
    test: /\.css$/,
+    include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
+  // Use CSS modules for custom stylesheets
+  {
+    test: /\.css$/,
+    exclude: /node_modules/,
+    use: [
+        MiniCssExtractPlugin.loader,
+        {
+          loader: 'css-loader',
+          options: {
+            modules: true,
+            localIdentName: '[name]__[local]___[hash:base64:5]',
+            camelCase: true,
+          },
+        },
+      ]
+  },
+  // Do not use CSS modules in node_modules folder

```


- We are going to create now a sidebar component, _src/sidebar.tsx_. Right now we will create just
a rectangle and we will interact with the animation.

_./src/sidebar.tsx_

```jsx
import * as React from 'react';

const classNames = require('./sidebar.css');

export const SidebarComponent = () => 
    <div id="mySidenav" className={classNames.sidenav}>
        <span>Basic side bar, first steps</span>
    </div>
```

- We are going to add a known id to the body section of _src/index.html_ page

_./src/index.html_

```diff
-  <body>
+  <body id="main">
```

- Let's place the component adding it into the `app.tsx`:

_./src/app.tsx_

```diff
  import * as React from 'react';
  import { HelloComponent } from './hello';
  import { NameEditComponent } from './nameEdit';
+  import { SidebarComponent } from './sidebar';
```

_./src/app.tsx_

```diff
  return (
    <>
+      <SidebarComponent/>
      <HelloComponent userName={this.state.userName} />
      <NameEditComponent userName={this.state.userName} 
        onChange={this.setUsernameState.bind(this)}
       />
    </>
  );
```

- Now it is time to run the app, just to check we haven't broken anything (but you will see no results).

```
 npm start
```

- Let's start with the interesting part of this implementation, let's add a flag to show/hide the
sidebar _sidebar.tsx_.

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

+ interface Props {
+  isVisible: boolean;
+ }

- export const SidebarComponent = () => 
+ export const SidebarComponent = (props: Props) => 
    <div id="mySidenav" className={classNames.sidenav}>
        <span>Basic sidebar, first steps</span>
    </div>
```

- Now let's add some logic to show / hide the sidebar in case the flag gets
updated

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible: boolean;
};

+    const divStyle = (props: Props): React.CSSProperties => ({
+      width: (props.isVisible) ? '23rem' : '0rem'
+    });

export const SidebarComponent = (props: Props) => 
-    <div id="mySidenav" className={classNames.sidenav}>
+    <div id="mySidenav" className={classNames.sidenav} 
+      style={divStyle(props)}
+    >
        <span>Basic sidebar, first steps</span>
    </div>
```

- Now at app level (in file _app.tsx_) we can add a new member to the state (a boolean flag) and a button to turn it
off and on.

```diff
  interface State {
    userName : string;
+    isSidebarVisible : boolean;
  }
```

```diff
export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

-    this.state = {userName: 'defaultUserName'};
+    this.state = {
+       userName: "defaultUserName",
+       isSidebarVisible: false
+     };
  }

  setUsernameState(event) {
    // If the state gets more complex we should use object.assign
    this.setState({userName: event.target.value});
  }

+   toggleSidebarVisibility = () => {
+     const newVisibleState = !this.state.isSidebarVisible;
+
+     this.setState({isSidebarVisible: newVisibleState} as State);
+   }


  public render() {
    return (
      <>
-        <SidebarComponent/>
+        <SidebarComponent isVisible={this.state.isSidebarVisible}/>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName}       onChange={this.setUsernameState.bind(this)} 
        />
+       <div style={{float: 'right'}}>
+         <button
+           onClick={this.toggleSidebarVisibility}>
+           Toggle Sidebar
+         </button>
+       </div>
      </>
    );
  }
}
```

- At this point we will need to stop the app and start it again to see the changes working:

```
npm start
```

- If we run our sample, we can see how the sidebar is shown / hidden.

- So far so good, but what happens if we want to make this sidebar a reusable component? We could
just show the frame but the content should be dynamic.

- Let's start by adding some content when instantiating the sidebar (_app.tsx_).

_./src/app.tsx_

```diff
-  <SidebarComponent/>
+  <SidebarComponent isVisible={this.state.isSidebarVisible}>
+    <h1>Cool Scfi movies</h1>
+    <ul>
+      <li><a href="https://www.imdb.com/title/tt0816692/">Interstellar</a></li>
+      <li><a href="https://www.imdb.com/title/tt0083658/">Blade Runner</a></li>
+      <li><a href="https://www.imdb.com/title/tt0062622/">2001: a space odyssey</a></li>
+    </ul>  
+  </SidebarComponent>
```

- Now in the _sidebar.tsx_ let's dump this content by using {this.props.children}

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible: boolean;
};

const divStyle = (props: React.CSSProperties) => ({
  width: (props.isVisible) ? '250px' : '0px'
});

- export const SidebarComponent = (props: Props) => 
+ export const SidebarComponent : React.StatelessComponent<Props> = (props) => 

    <div id="mySidenav" className={classNames.sidenav} style={divStyle(props)}>
-       <span>Basic side bar, first steps</span>
+       {props.children}
    </div>
```

> This code can be enhanced, exercise: try to extract the width calculation to a separate function (isolated from  the SidebarComponent).

- Let's try the sample

```
npm start
```
