# 05 Refactor

In the previous sample we were setting an initial user name value, what would
happen if we expect this value to come from e.g. an AJAX request or if it could
change in time? The current approach won't work.

We can think about two possible solutions:

- The first idea that could come into our mind is to implement a mix: we receive via props the current name value, then we hold an state with the current editing
value... what drawbacks could we encounter? We have to listen on the componentWillRecieveProps for any change on the parent user name control and replace our state, we end up with a mixed governance.

- The second idea is to setup two properties, the parent control will hold _currentName_ and _editingName_, whenever the user clicks on the button to
replace the name it will notify the parent control and it will replace the
content of _currentName_" with the content from _editingName_. If _currentName_ gets updated by any other third partie (e.g. ajax callback) it will update as well
_editingName_.



We will take a startup point sample _04 Callback_:

Summary steps:

- Update _nameEdit.tsx_ in order to request the new editiingProperty, and remove it
from the state.

- Updte _app.tsx_ to hold in the state the new editing property, pass it to the
children control and perform the proper update on the callback event from the
child control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _04 Callback_ and execute _npm install_.

- Update _nameEdit.tsx_ in order to request the new editiingProperty, and remove it
from the state.

```javascript
import * as React from 'react';

interface Props {  
  editingUserName : string;
  onEditingNameUpdated : (newEditingName : string) => any;
  onNameUpdateRequest : () => any;
}

interface State {

}


export class NameEditComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChange(event : any) : any {
    this.props.onEditingNameUpdated(event.target.value);
  }


  onNameSubmit(event : any) : any {
    this.props.onNameUpdateRequest();
  }

  public render() {
      return (
        <div>
          <label>Update Name:</label>
          <input value={this.props.editingUserName} onChange={this.onChange.bind(this)}/>
          <input type="submit" value="Change" className="btn btn-default" onClick={this.onNameSubmit.bind(this)} />
        </div>
      );
 }
}
```

- Update _app.tsx_ to hold in the state the new editing property, pass it to the
children control and perform the proper update on the callback event from the
child control.


```javascript
import * as React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

interface Props {

}

interface State {
  userName : string;
  editingUserName : string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const defaultUserName = "defaultUserName";
    this.state = {userName: defaultUserName, editingUserName: defaultUserName};
  }

  setUsernameState() {
    this.setState({userName: this.state.editingUserName} as State);
  }

  updateEditingName(editingName : string) {
    this.setState({editingUserName: editingName} as State);
  }

  public render() {
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
