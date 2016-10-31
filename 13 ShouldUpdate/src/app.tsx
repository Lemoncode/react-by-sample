import * as React from 'react';
import {FaceComponent} from './face'

interface Props {
}

interface State {
  satisfactionLevel : number;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {satisfactionLevel: 300};
  }

  public render() {
    return (
      <div>
        <input type="range"
                min="0"
                max="500"
                value={this.state.satisfactionLevel}
                onChange={(event : any) => this.setState({satisfactionLevel :event.target.value} as State)}
        />
        <br/>
        <span>{this.state.satisfactionLevel}</span>
        <br/>
        <FaceComponent level={this.state.satisfactionLevel}/>
      </div>
    );
  }
}
