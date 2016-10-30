import * as React from 'react';

export const NameEditComponent = (props : { userName : string, onChange : (event : any) => any }) => {
  return (
    <div>
      <label>Update Name:</label>
      <input value={props.userName} onChange={props.onChange} />
    </div>
  );
}
