import * as React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

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

  setUsernameState(event) {
    // If the state gets more complex we should use object.assign
    this.setState({userName: event.target.value});
  }

  public render() {
      return (
       <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState.bind(this)} />
       </div>
      );
 }
}
