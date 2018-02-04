# 06 MoveBackToStateless

In example 05 we learned how to remove state from a child control just to have clear governance of state.

It's time to make some cleanup, let's simplify _nameEdit_ component and move it as a stateless component.

We will take a startup point sample _05 MoveBacktOStateless_.

Summary steps:

- Update _nameEdit.tsx_, port it to stateless component and add the methods inline.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _05 Refactor_ and execute `npm install`.

- Update _nameEdit.tsx_, port it to stateless component and add the methods inline. It should look like:

 ```jsx
import * as React from 'react';
import {Fragment} from 'react';


interface Props {
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => void;
    onNameUpdateRequest : () => void;  
}

  
export const NameEditComponent = (props : Props) =>
  <div>
      <label>Update Name:</label>
      <input value={props.editingUserName}
        onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

      <button className="btn btn-default" onClick={props.onNameUpdateRequest}>Change</button>
  </div>
 ```
