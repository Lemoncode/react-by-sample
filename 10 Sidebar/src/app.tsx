import * as React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';
import {SidebarComponent} from './sidebar'

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

  toggleSidebarVisibility() {
    const newVisibleState = !this.state.isSidebarVisible;

    this.setState({isSidebarVisible: newVisibleState} as State);
  }

  ButtonStyle = {
     marginLeft: '450px'
   };

  public render() {
      return (
       <div>
        <SidebarComponent isVisible={this.state.isSidebarVisible}/>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState.bind(this)} />
        <input type="submit"
          value="Toggle Sidear"
          className="btn btn-default"
          style={this.ButtonStyle}
          onClick={this.toggleSidebarVisibility.bind(this)}
          />
       </div>
      );
 }
}
