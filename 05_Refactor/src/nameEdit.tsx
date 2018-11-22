import * as React from 'react';

interface Props {
  editingUserName: string;
  onEditingNameUpdated: (newEditingName: string) => void;
  onNameUpdateRequest: () => void;
}


export class NameEditComponent extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onEditingNameUpdated((e.target as HTMLInputElement).value);
  }


  public render() {
    return (
      <>
        <label>Update Name:</label>
        <input value={this.props.editingUserName}
          onChange={this.onChange} />
        <button className="btn btn-default" onClick={this.props.onNameUpdateRequest}>Change</button>
      </>
    );
  }
}
