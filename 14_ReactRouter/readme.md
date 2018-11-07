# 14 ReactRouter

In this sample we will start using React-Router (<acronym title="Single Page Application">SPA</acronym> navigation).

In this case we will provide a default `userName` but let the user update it.

We will take a startup point sample _[03 State](./../03%20State)_:

## Summary steps:

- Let's make first some cleanup: remove _hello.tsx_ and _nameEdit.tsx_
- Let's create two components _[PageA.tsx](./src/pageA.tsx)_ and _[PageB.tsx](./src/pageB.tsx)_
- Let's install the dependencies to _react-router-dom_ and typescript definitions for this.
- Let's define the routing.
- Let's define a navigation from _[PageA.tsx](./src/pageA.tsx)_ to _[PageB.tsx](./src/pageB.tsx)_.
- Let's define a navigation from _[PageB.tsx](./src/pageB.tsx)_ to _[PageA.tsx](./src/pageA.tsx)_.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[03 State](./../03%20State)_ and execute:

  ```
  npm install
  ```

- Let's make some cleanup (remove _src/hello.tsx_ and _src/nameEdit.tsx_ files).

- Let's create a component called _PageA_ as _src/pageA.tsx_:

_./src/pageA.tsx_

```jsx
import * as React from "react"

export const PageA = () =>
    <div>
      <h2>Hello from page A</h2>
    </div>
```

- Let's create a component called _PageB_ as _src/pageB.tsx_:

_./src/pageB.tsx_

```jsx
import * as React from "react"

export const PageB = () =>
    <div>
      <h2>Hello from page B</h2>
    </div>
```

- Let's install the dependencies [`react-router-dom`](https://github.com/ReactTraining/react-router) and typescript definitions for this.

```bash
npm install react-router-dom --save
npm install @types/react-router-dom --save-dev
```

- Let's define the routing in _main.tsx_:

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import { App } from './app';
- import { HelloComponent } from './hello';
+ import { HashRouter, Switch, Route } from 'react-router-dom';
+ import { PageA } from './pageA';
+ import { PageB } from './pageB';

ReactDOM.render(
- <App />
+ <HashRouter>
+   <Switch>
+     <Route exact={true} path="/" component={PageA} />
+     <Route path="/pageB" component={PageB} />
+   </Switch>
+ </HashRouter>,
document.getElementById('root')
);

```

- It's time to check that we are following the right track:

```bash
npm start
```

- Let's define a navigation from _[PageA.tsx](./src/pageA.tsx)_ to _[PageB.tsx](./src/pageB.tsx)_.

_./src/pageA.tsx_

```diff
import * as React from "react"
+ import { Link } from 'react-router-dom';

export const PageA = () =>
    <div>
      <h2>Hello from page A</h2>
+     <br />
+     <Link to="/pageB">Navigate to Page B</Link>
    </div>
```

- Let's define a navigation from _[PageB.tsx](./src/pageB.tsx)_ to _[PageA.tsx](./src/pageA.tsx)_

_./src/pageB.tsx_

```diff
import * as React from "react"
+ import { Link } from 'react-router-dom';

export const PageB = () =>
    <div>
      <h2>Hello from page B</h2>
+     <br />
+     <Link to="/">Navigate to Page A</Link>
    </div>
```


- Let's run the app and check that the navigation links are working

```bash
npm start
```
