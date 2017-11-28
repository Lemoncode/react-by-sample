import * as React from 'react';

interface Props { 
  userName: string, 
  onChange: (event: any) => any 
}

export const NameEditComponent = (props: Props) => {
  return (
    <div>
      <label>Update Name:</label>
      <input value={props.userName} onChange={props.onChange} />
    </div>
  );
}
