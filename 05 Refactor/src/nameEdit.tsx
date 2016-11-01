import * as React from 'react';

interface Props {
  editingUserName : string;
  onEditingNameUpdated : (newEditingName : string) => void;
  onNameUpdateRequest : () => void;
}

export class NameEditComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>Update Name:</label>
        <input value={this.props.editingUserName} 
          onChange={(e) : void => this.props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />
        <input type="submit" value="Change" className="btn btn-default" 
          onClick={this.props.onNameUpdateRequest} />
      </div>
    );
  }
}
