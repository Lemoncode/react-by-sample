import * as React from 'react';
import {Fragment} from 'react';


interface Props {
  initialUserName: string;
  onNameUpdated: (newName: string) => any;    
}

interface State {
  editingName: string;
}
  
export class NameEditComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {editingName: this.props.initialUserName}
  }

  onChange = (event) => {
    this.setState({editingName: event.target.value} as State);
  }

  onNameSubmit = (event) => {
    this.props.onNameUpdated(this.state.editingName);
  }

  public render() {
    return (
      <div>
          <label>Update Name:</label>
          <input value={this.state.editingName} onChange={this.onChange}/>
          <button className="btn btn-default" onClick={this.onNameSubmit}>Change</button>
      </div>
    )
  }
}
