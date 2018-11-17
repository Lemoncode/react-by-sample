## Intro

As we saw in sample _17 Context_ this is a powerfull feature.

Getting data from a _Context.Consumer_ needs some plumbing, we have used so far HOC (example 18) and Render Props (example 19) to wrap that into some reusable code, that was nice but it needed to add some extra markup to our components, making heavy use of HOC and RenderProps can lead you to the _markup hell_ (lot of nested HOC / Render props).

Let's see how this is solved using Hooks + Use Context.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Let's copy the code from sample _19 RenderProps_.

- Let's install the dependencies.

```bash
npm install
```

- Now we are going to uninstall current version of react and react-dom:

```bash
npm uninstall react react-dom --save
```

- And install the 16.7 alfa version:

```bash
npm install react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0 --save
```

- Let's replace the render props solution with a _UseContext_.

_./src/pages/pageB.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
- import { Session } from '../../common/';
+ import { SessionContext } from '../../common';

// ...

- export const PageB = () =>
+ export const PageB = () => {
+ const loginContext = React.useContext(SessionContext)
+
+ return (

  <div>
-     <Session
-         render={
-           login => (
-             <LoginComponent login={login}></LoginComponent>
-             )}
-     >
+     <LoginComponent login={loginContext.login}></LoginComponent>
  </div>
+}
```

- So now our _PageB_ component looks as simple as:

_./src/pages/pageB.tsx_

```tsx
export const PageB = () => {
  const loginContext = React.useContext(SessionContext);

  return (
    <div>
      <LoginComponent login={loginContext.login}></LoginComponent>
    </div>
  )
}
```

- Now we can get rid of the _renderProps_ helper we created.

_./src/common/sessionContext.tsx_

```diff
import * as React from "react"

export interface SessionContextProps {
  login: string;
  updateLogin: (value) => void;
}

export const createDefaultUser = (): SessionContextProps => ({
  login: 'no user',
  updateLogin: (value) => { },
});

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());

interface State extends SessionContextProps {
}

export class SessionProvider extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      login: createDefaultUser().login,
      updateLogin: this.setLoginInfo
    }
  }

  setLoginInfo = (newLogin) => {
    this.setState({ login: newLogin })
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  };
};

interface Props {
  render : (login : string) => React.ReactNode;
}

- export class Session extends React.Component<Props> {
-  constructor(props : Props) {
-    super(props);
-  }
-
-  render() {
-    return (
-      <SessionContext.Consumer>
-        {
-          ({ login, updateLogin }) =>
-            <>
-            {this.props.render(login)}
-            </>
-        }
-      </SessionContext.Consumer>
-    )
-  }
- }
```

