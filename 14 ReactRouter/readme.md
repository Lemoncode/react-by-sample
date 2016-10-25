# 03 State

In this sample we will introduce a basic React concept, handling State.

In this case scenario we will provide a default userName but let the user update
it.


We will take a startup point sample _03 State_:

Summary steps:

- Let's make first some cleanup: remove _hello.tsx_ and _nameEdit.tsx_
- Let's create two components PageA and PageB
- Let's install the dependencies _react-router_ and typescript definitions for this.
- Let's define the routing.
- Let's define a navigation from PageA to PageB.
- Let's define a navigation from PageB to PageA

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute _npm install_.

- Let's make some cleanup (remove _hello.tsx_ and _nameEdit.tsx_).

- Let's create a component called PageA:

```javascript
import * as React from "react"

export const PageA = () => {
  return (
    <div>
      <h2> Hello from page A</h2>
    </div>
  )
}
```

- Let's create a component called PageB:

```javascript
import * as React from "react"

export const PageB = () => {
  return (
    <div>
      <h2> Hello from page B</h2>
    </div>
  )
}
```

- Let's install the dependencies _react-router_ and typescript definitions for this.

```
npm install react-router --save
```
```
npm install @types/react-router --save
```
> Note at the time of this writing, we install react-roter typescript definitions 2.0.37 (2.0.38 seemed to had issues)

- Let's define the routing in main.tsx_

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {PageA} from './pageA';
import {PageB} from './pageB';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={PageA}/>
      <Route path="/pageA" component={PageA} />
      <Route path="/pageB"  component={PageB} />
    </Route>
  </Router>

  , document.getElementById('root'));
```

- Let's update app.tsx and indicate a place holder to draw the pages.

```javascript
import * as React from 'react';

export class App extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
      return (
       <div>
        <h1>App router sample</h1>
        <br/>
        {this.props.children}
       </div>
      );
 }
}
```

- It's time to check that we are following the right track:

```
npm start
```

- Let's define a navigation from PageA to PageB (_pageA.tsx_).

```
import * as React from "react"
import {Link} from 'react-router';

export const PageA = () => {
  return (
    <div>
      <h2> Hello from page A</h2>
      <br/>
      <Link to="/pageB">Navigate to Page B</Link>
    </div>
  )
}
```

- Let's define a navigation from PageB to PageA  (_pageA.tsx_)

```
import * as React from "react"
import {Link} from 'react-router';

export const PageB = () => {
  return (
    <div>
      <h2> Hello from page B</h2>
      <br/>
      <Link to="/pageA">Navigate to Page B</Link>
    </div>
  )
}
```


- Let's run the app and check that the navigation links are working

```
npm start
```
