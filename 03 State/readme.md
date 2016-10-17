# 03 State

In this sample we will introduce a basic React concept, handling State.

In this case scenario we will provide a default userName but let the user update
it.


We will take a startup point sample _02 Properties_:

Summary steps:

- An app component that will hold an state, this state will contain the current
_username_ (by default assigned to "no user" value).
- This app component will render the _HelloWorld_ component.
- We will

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 Properties_ and execute _npm install_.

- Let's create an _app.tsx_ component (this component will display the _hello_world_ component).

```javascript
import * as React from 'react';
import {HelloComponent} from './hello';

export const App = () => {
  return (
    <HelloComponent userName="John" />
  );
}
```

- Let's update _main.tsx_ just to use the _app_ component that we have recently created.

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';

ReactDOM.render(
  <App/>
  , document.getElementById('root'));
```

- Now we can check that things are still working as expected (nothing broken so far).

```
npm start
```

- It's time to revisit _app.tsx_, since we want to store the name of the user and let the
user updated it, let's move this component to a class stateful component and define
an state, including _username_ and pass this value to the _helloword_ component.

```javascript
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

    this.state = {userName: "defaultUserName"};
  }

  public render() {
      return (
       <HelloComponent userName={this.state.userName} />
      );
 }
}
```

- Again, we can make a quick check point to test that everything is working as expected.

```
npm start
```

- Now it's time to create an _NameEdit_ component, this component will let the user
update his userName and will notify with a callback to the parent control whenver
the _username_ gets updated.

```javascript
import * as React from 'react';

export const NameEditComponent = (props: {userName : string, onChange : (event : any) => any}) => {
  return (
    <div>
      <label>Update Name:</label>
      <input value={this.props.userName} onChange={this.props.onChange}/>
    </div>
  );
}
```

- In the app.tsx let's add a callback and proper configure it.

```javascript
```

- Now let's test the final sample

```
npm start
```
