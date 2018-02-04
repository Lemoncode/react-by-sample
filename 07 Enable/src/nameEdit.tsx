import * as React from 'react';
import {Fragment} from 'react';


interface Props {
    userName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => void;
    onNameUpdateRequest : () => void;  
}

  
export const NameEditComponent = (props : Props) =>
    <div>
        <label>Update Name:</label>
        <input value={props.editingUserName}
          onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

        <button 
            className="btn btn-default" 
            onClick={props.onNameUpdateRequest}
            disabled={props.editingUserName === '' || props.userName === props.editingUserName}
            >Change</button>
    </div>


