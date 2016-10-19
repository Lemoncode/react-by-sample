import * as React from 'react';

interface Props {
  editingUserName : string;
  onEditingNameUpdated : (newEditingName : string) => any;
  onNameUpdateRequest : () => void;
}

export const NameEditComponent = (props: Props) => {
    return (
      <div>
        <label>Update Name:</label>
        <input value={props.editingUserName} onChange={(event : any) => props.onEditingNameUpdated(event.target.value)}/>
        <input type="submit" value="Change" className="btn btn-default" onClick={props.onNameUpdateRequest} />
      </div>
    );
}
