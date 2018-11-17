## 20 Error Boundaries

In this example we will play with the Error Boundary concept.


## Summary steps:


## Prerequisites

Install [Node.js and npm](https://nodejs.org) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute `npm install`.

- Let's create a faulty component:

_./src/faultyComponent.tsx_

```jsx
import * as React from 'react';

export class FaultyComponent extends React.Component {
  componentDidMount() {
    throw "I'm the faulty component, generating a bad crash."
  }

  render() {
    return (
      <h2>Hello from Faulty Component</h2>
    )
  }
}
```

- Let's instantiate this component in our _app.tsx_

_./src/app.tsx_

```diff
import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
+ import { FaultyComponent } from './faultyComponent';

interface Props {
}

interface State {
  userName: string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { userName: 'defaultUserName' };
  }

  setUsernameState = (event) => {
    this.setState({ userName: event.target.value });
  }


  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        <FaultyComponent/>
      </>
    );
  }
}
```

- Let's run the app.

```bash
npm start
```

- If you open the console you will see a bad crash being reported, that's something that you wouldn't like to suffer when you are using plugins and other components that you may not trust, why not wrap any error in a safe area ?
and display a friendly component failed to load in case of an uncontroller error happen in that area (and keep the rest of application working as expected).

- Let's create an Error Boundary.

_./src/erroBoundary.tsx_

```jsx
import * as React from 'React';

export class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Plugin Failed to load, optional error info:</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

- And let's wrap our faultyComponent inside this error boundary (we could wrap a set of components if needed).

_./src/app.tsx_

```diff
import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
import { FaultyComponent } from './faultyComponent';
+ import { ErrorBoundary } from './errorBoundary';

interface Props {
}

interface State {
  userName: string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { userName: 'defaultUserName' };
  }

  setUsernameState = (event) => {
    this.setState({ userName: event.target.value });
  }


  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        <ErrorBoundary>
          <FaultyComponent/>
+        </ErrorBoundary>
      </>
    );
  }
}
```

> There's a nice generic wrapper for this ErrorBoundary: https://github.com/bvaughn/react-error-boundary

> Error boundaries and event handlers: https://github.com/facebook/react/issues/11409