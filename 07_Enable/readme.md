# 07 Enable

Let's continue with the update name sample, this time we want to disable the
"update" button when the input is empty or when the value hasn't changed.

We will take a startup point sample _[06 MoveBackToStateless/](./../06%20MoveBackToStateless/)_.

## Summary steps:

- Add a condition to disable

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[06 MoveBackToStateless/](./../06%20MoveBackToStateless/)_.

- Let's start by adding a condition to disable the field whenever is empty. Replace only the input tag in _[./src/nameEdit.tsx](./src/nameEdit.tsx)_ with the following code:

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
    <div>
        <label>Update Name:</label>
        <input value={props.editingUserName}
          onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

-        <button className="btn btn-default" 
-                 onClick={props.onNameUpdateRequest}
-         >
-           Change
-         </button>
+        <button 
+          className="btn btn-default" 
+          onClick={props.onNameUpdateRequest}
+          disabled={props.editingUserName === ''}
+        >
+           Change
+        </button>
    </div>
```

- Now comes the tricky part, detect when the name hasn't changed.<br />
First we will add a new property called _userName_ with type `string` in _[./src/nameEdit.tsx](./src/nameEdit.tsx)_. This one will hold the last accepted userName.

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
 interface Props {
+   userName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => any;
    onNameUpdateRequest : () => void;
 }
 ```

- We will add to the enable condition one more test, checking if name has changed.
Replace again only the input tag in _[./src/nameEdit.tsx](./src/nameEdit.tsx)_ with the following code:

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
  <button 
      className="btn btn-default" 
      onClick={props.onNameUpdateRequest}
-      disabled={props.editingUserName === ''}
+      disabled={props.editingUserName === '' 
+      || 
+      props.userName === props.editingUserName}
      >
        Change
      </button>
```

- Now we have to feed this property from the parent control (Add `userName={this.state.userName}` to the NameEditComponent in _[./src/app.tsx](./src/app.tsx)_). The `NameEditComponent` should be like:

_[./src/app.tsx](./src/app.tsx)_
```diff
  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName}/>
        <NameEditComponent
++          userName={this.state.userName}
            editingUserName={this.state.editingUserName}
            onEditingNameUpdated={this.updateEditingName}
            onNameUpdateRequest={this.setUsernameState} />
      </>
    );
  }
```

- Let's give a try

```
npm start
```

> As an excercise, what if we want to do this more generic? we could have a generic property called enable that could be true or false.

To do this, we will modify [./src/app.tsx](./src/app.tsx) adding the variable `disable` to the `<NameEditComponent>` component. This variable is **Boolean**, so you need conditions to evaluate it.

_[./src/app.tsx](./src/app.tsx)_
```diff
  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
+        disable={!this.state.userName 
+        || this.state.userName === this.state.editingUserName}
          userName={this.state.userName}
          editingUserName={this.state.editingUserName}
          onEditingNameUpdated={this.updateEditingName}
          onNameUpdateRequest={this.setUsernameState} />
      </>
    );
  }
```

Within the component we define the **props** **disable** as Boolean, together with its conditions that will evaluate it.

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
interface Props {
++  disable: boolean;
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
--        disabled={props.editingUserName === '' 
-         ||
-         props.userName === props.editingUserName}
++        disabled={props.disable}
        >
          Change
        </button>
  </div>
```
