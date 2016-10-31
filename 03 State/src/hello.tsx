import * as React from 'react';

export const HelloComponent = (props : {userName : string}) => {
  return (
    <h2>Hello user: {props.userName} !</h2>
  );
}
