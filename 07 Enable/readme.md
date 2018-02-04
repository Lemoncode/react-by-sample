# 07 Enable


Let's continue with the update name sample, this time we want to disable the
"update" button when the input is empty or when the value hasn't changed.

We will take a startup point sample _06 MoveBacktOStateless_.

Summary steps:

- Add a condition to disable


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _06 MoveBacktoStateless_.

- Let's start by adding a condition to disable the field whenever is empty. Replace only the input tag in _src/nameEdit.tsx_ with the following code:

_./src/nameEditComponent.tsx_

```diff
    <div>
        <label>Update Name:</label>
        <input value={props.editingUserName}
          onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

-        <button className="btn btn-default" onClick={props.onNameUpdateRequest}>Change</button>
+        <button 
+          className="btn btn-default" 
+          onClick={props.onNameUpdateRequest}
+          disabled={props.editingUserName === ''}
+        >Change</button>
    </div>
```


- Now comes the tricky part, detect when the name hasn't changed.<br />
First we will add a new property called _userName_ with type `string` in _src/nameEdit.tsx_. This one will hold the last accepted userName.

_./src/nameEdit.tsx_

 ```diff
 interface Props {
+    userName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => any;
    onNameUpdateRequest : () => void;
 }
 ```

- We will add to the enable condition one more test, checking if name has changed.
Replace again only the input tag in _src/nameEdit.tsx_ with the following code:

```diff
  <button 
      className="btn btn-default" 
      onClick={props.onNameUpdateRequest}
-      disabled={props.editingUserName === ''}
+      disabled={props.editingUserName === '' || props.userName === props.editingUserName}
      >Change</button>
```

- Now we have to feed this property from the parent control (Add `userName={this.state.userName}` to the NameEditComponent in _src/app.tsx_). The `NameEditComponent` should be like:

_./src/app.tsx_

```diff
  public render() {
    return (
      <React.Fragment>
        <HelloComponent userName={this.state.userName}/>
        <NameEditComponent
+           userName={this.state.userName}
            editingUserName={this.state.editingUserName}
            onEditingNameUpdated={this.updateEditingName}
            onNameUpdateRequest={this.setUsernameState} />
      </React.Fragment>
    );
  }
```

- Let's give a try

 ```
npm start
 ```

 > As an excercise, what if we want to do this more generic? we could have a generic property
 called enable that could be true or false.
