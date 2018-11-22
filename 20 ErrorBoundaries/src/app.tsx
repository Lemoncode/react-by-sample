import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
import { FaultyComponent } from './faultyComponent';
import { ErrorBoundary } from './errorBoundary';

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
        <ErrorBoundary>
          <FaultyComponent/>
        </ErrorBoundary>        
      </>
    );
  }
}