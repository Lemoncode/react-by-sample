import * as React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

interface Props{
}

interface State {
  userName : string;
  editingUserName : string;
}

export class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const defaultUserName = 'defaultUserName';
    this.state = {userName: defaultUserName, editingUserName: defaultUserName};
  }

  setUsernameState = () : void => {
    this.setState({userName: this.state.editingUserName} as State);
  }

  updateEditingName = (editingName : string) : void => {
    this.setState({editingUserName: editingName} as State);
  }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
          editingUserName={this.state.editingUserName}
          onEditingNameUpdated={this.updateEditingName}
          onNameUpdateRequest={this.setUsernameState} />
      </div>
    );
  }
}
