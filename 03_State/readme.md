# 03 State

In this example we introduce a basic React concept: handling State.

In this scenario we provide a default username and let the user update it.

We take as a starting point the example _02 Properties_:

## Summary steps:

- Create an _App_ component that holds the state. This state will contain the current
username (with default value "defaultUserName").
This _App_ component renders the _Hello_ component. At first we create a simple stateless
_App_ component.
- Update _main.tsx_ file to include our _App_ component.
- Change _App_ component to a stateful class component to hold the _userName_ state.
- Create a _NameEdit_ component to let the user change the value of username. This changes the _App_ state
using a function from _App_.
- Check everything works properly.

## Prerequisites

Install [Node.js and npm](https://nodejs.org) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 Properties_ and execute `npm install`.

- Let's create an _App_ component under a new file named _app.tsx_ (this component will display the _Hello_ component).

_./src/app.tsx_

```jsx
import * as React from 'react';
import {HelloComponent} from './hello';

export const App = () => {
  return (
    <HelloComponent userName="John" />
  );
}
```

- Let's update _main.tsx_ just to use the _App_ component that we have just created.

_./src/main.tsx_

```diff
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
+ import {App} from './app';

- import { HelloComponent } from './hello';

  ReactDOM.render(
-    <HelloComponent userName="John" />,
+    <App />,
    document.getElementById('root')
  );
```

- Now we can check that things are still working as expected.

  ```
  npm start
  ```

- It's time to revisit _app.tsx_. We want to store the user's name and let the user updated it. Let's move this component to a class stateful component and define a state including _userName_, and pass this value to the _Hello_ component.

_./src/app.tsx_

```jsx
import * as React from 'react';
import {HelloComponent} from './hello';

interface Props {
}

interface State {
  userName : string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {userName: 'defaultUserName'};
  }

  public render() {
    return (
      <HelloComponent userName={this.state.userName} />
    );
  }
}
```

- Again, we can do a quick check to test that everything works as expected.

  ```
  npm start
  ```

- Now it's time to create an _NameEdit_ component. This component lets the user update his username and notifies with a callback to the parent control whenever the value of _userName_ gets updated.

_./src/nameEdit.tsx_

```jsx
import * as React from 'react';

interface Props {
  userName : string;
  onChange : (event) => void;
}

export const NameEditComponent = (props : Props) => 
    <>
      <label>Update name:</label>
      <input value={props.userName} onChange={props.onChange}/>
    </>
```

Side note: What is this Fragment or <> stuff? A way to create component that has multiple root elements (not a single parent). Available from React 16.2. As an alternative you can type:

```jsx
  ...
  export const NameEditComponent = (props : Props) => 
    <React.Fragment>
      <label>Update name:</label>
      <input value={props.userName} onChange={props.onChange}/>
    </React.Fragment>
}
```

- In the _app.tsx_ file, let's add a function to replace the state value of _userName_ with the new one.

```diff
  import * as React from 'react';
  import {HelloComponent} from './hello';
+ import {NameEditComponent} from './nameEdit';

  interface Props {
  }

  interface State {
    userName : string;
  }

  export class App extends React.Component<Props, State> {
    constructor(props : Props) {
      super(props);

      this.state = {userName: 'defaultUserName'};
    }

+    setUsernameState = (event) => {
+      this.setState({userName: event.target.value});
+    }

    public render() {
      return (
+        <>
          <HelloComponent userName={this.state.userName} />
+          <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        </>
      );
    }
  }
```

Side note: mind the use of the fat arrow function. This avoids losing the context for _this_ in the callback.

Side note 2: this.setState() will change the value of the state at some point in the future. Do not consider it is a synchronous change - it isn't. Writing logic that depends on the username new value being in the state right after calling this.setState() is wrong and might fail. If you need to write code dependent on the new value being in the state, use a callback as second parameter of this.setState(). See this example

```
  setUserNameState = (newName: string) => {
    this.setState({userName: newName}, this.nameChanged);
  }
  
  nameChanged() {
    /* logic here gets invoked after the new name value in the state is set. */
  }
```

- Finally let's test everything works once more.

  ```
  npm start
  ```
