import * as React from 'react';
import {Fragment} from 'react';


interface Props {
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => void;
    onNameUpdateRequest : () => void;  
}

interface State {
  editingName: string;
}
  
export class NameEditComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
          <label>Update Name:</label>
          <input value={this.props.editingUserName}
            onChange={(e) : void => this.props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

          <button className="btn btn-default" onClick={this.props.onNameUpdateRequest}>Change</button>
      </div>
    )
  }
}
