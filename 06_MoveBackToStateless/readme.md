# 06 MoveBackToStateless

In example 05 we learned how to remove state from a child control just to have clear governance of state.

It's time to make some cleanup, let's simplify _[nameEdit.tsx](./src/nameEdit.tsx)_ component and move it as a stateless component.

Let's take example _[05 Refactor](./../05%20Refactor)_ as reference.

## Summary steps:

- Update _[nameEdit.tsx](./src/nameEdit.tsx)_, transform it to a stateless component and inline some methods.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[05 Refactor](./../05%20Refactor)_ and execute `npm install`.

- Update _[nameEdit.tsx](./src/nameEdit.tsx)_, transform it to stateless component and inline some methods. It should look like this:

 ```jsx
import * as React from 'react';

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
Side note: when refactoring this code, we have replaced ```this.props``` by ```props```. This is because ```NameEditComponent``` is now a function, not a class. If you keep ```this.props```, it fails in runtime because ```this``` is now undefined.

- Now we can run the example, and we get the same results.

```bash
npm start
```
