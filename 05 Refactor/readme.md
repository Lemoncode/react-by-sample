# 05 Refactor

In the previous sample we were setting an initial username value, what would
happen if we expect this value to come from e.g. an AJAX request or if it could
change in time? The current approach won't work.

We can think about two possible solutions:

- The first idea that could come into our mind is to implement a mix: we receive via props the current name value, then we hold an state with the current editing
value... what drawbacks could we encounter? We have to listen on the componentWillRecieveProps for any change on the parent user name control and replace our state, we end up with a mixed governance.

- The second idea is to setup two properties, the parent control will hold _userName_ and _editingUsername__, whenever the user clicks on the button to
replace the name it will notify the parent control and it will replace the
content of _userName_" with the content from _editingUsername_. If _userName_ gets updated by any other third party (e.g. ajax callback) it will update as well
_editingUsername_.

We will take as a starting point sample _04 Callback_:

Summary steps:

- Update _nameEdit.tsx_ in order to request the new _editingUsername_, and remove it from the state.

- Update _app.tsx_ to hold the new editing property in the state, pass it to the
children, control and perform the proper update on the callback event from the
child control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _04 Callback_ and execute `npm install`.

- Update _nameEdit.tsx_ in order to request the new _editingUsername_, and remove it
from the state.

  ```jsx
  import * as React from 'react';

  interface Props {
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => void;
    onNameUpdateRequest : () => void;
  }

  export class NameEditComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
      super(props);
    }

    render() {
      return (
        <div>
          <label>Update Name:</label>
          <input value={this.props.editingUserName}
            onChange={(e) : void => this.props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />
          <input type="submit" value="Change" className="btn btn-default"
            onClick={this.props.onNameUpdateRequest} />
        </div>
      );
    }
  }

  ```

- Update _app.tsx_ to hold the new editing property in the state, pass it to the
children control and perform the proper update on the callback event from the
child control.


  ```jsx
  import * as React from 'react';
  import {HelloComponent} from './hello';
  import {NameEditComponent} from './nameEdit';

  interface State {
    userName : string;
    editingUserName : string;
  }

  export class App extends React.Component<{}, State> {
    constructor(props) {
      super(props);

      const defaultUserName = 'defaultUserName';
      this.state = {userName: defaultUserName, editingUserName: defaultUserName};
    }

    setUsernameState() : void {
      this.setState({userName: this.state.editingUserName} as State);
    }

    updateEditingName(editingName : string) : void {
      this.setState({editingUserName: editingName} as State);
    }

    render() {
      return (
        <div>
          <HelloComponent userName={this.state.userName} />
          <NameEditComponent
            editingUserName={this.state.editingUserName}
            onEditingNameUpdated={this.updateEditingName.bind(this)}
            onNameUpdateRequest={this.setUsernameState.bind(this)} />
        </div>
      );
    }
  }
  ```

Finally we can check the sample is working as _04 Callback_ executing from the command line
`npm start` and opening [http://localhost:8080](http://localhost:8080).
