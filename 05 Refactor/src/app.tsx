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
