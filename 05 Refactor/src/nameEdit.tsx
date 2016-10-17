import * as React from 'react';

interface Props {  
  editingUserName : string;
  onEditingNameUpdated : (newEditingName : string) => any;
  onNameUpdateRequest : () => any;
}

interface State {

}


export class NameEditComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChange(event : any) : any {
    this.props.onEditingNameUpdated(event.target.value);
  }


  onNameSubmit(event : any) : any {
    this.props.onNameUpdateRequest();
  }

  public render() {
      return (
        <div>
          <label>Update Name:</label>
          <input value={this.props.editingUserName} onChange={this.onChange.bind(this)}/>
          <input type="submit" value="Change" className="btn btn-default" onClick={this.onNameSubmit.bind(this)} />
        </div>
      );
 }
}
