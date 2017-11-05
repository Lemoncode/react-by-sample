import * as React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';
import {SidebarComponent} from './sidebar';

interface Props {

}

interface State {
  userName : string;
  isSidebarVisible : boolean;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {userName: "defaultUserName", isSidebarVisible: false};
  }

  setUsernameState(event) {
    this.setState({userName: event.target.value} as State);
  }

  toggleSidebarVisibility = () => {
    const newVisibleState = !this.state.isSidebarVisible;

    this.setState({isSidebarVisible: newVisibleState} as State);
  }

  public render() {
    return (
      <div>
        <SidebarComponent isVisible={this.state.isSidebarVisible}>
          <h1>Test content</h1>
        </SidebarComponent>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState.bind(this)} />
        <div className="pull-right">
          <button
            className="btn btn-default"
            onClick={this.toggleSidebarVisibility}>
            Toggle Sidebar
        </button>
        </div>
      </div>
    );
  }
}
