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

 ```jsx
  <input type="submit" value="Change"
    className="btn btn-default"
    onClick={props.onNameUpdateRequest}
    disabled={props.editingUserName === ''}
    />
```

- Now comes the tricky part, detect when the name hasn't changed.<br />
First we will add a new property called _userName_ with type `string` in _src/nameEdit.tsx_. This one will hold the last accepted userName.

 ```jsx
 interface Props {
    UserName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => any;
    onNameUpdateRequest : () => void;
 }
 ```

- We will add to the enable condition one more test, checking if name has changed.
Replace again only the input tag in _src/nameEdit.tsx_ with the following code:

 ```jsx
 <input type="submit" value="Change"
    className="btn btn-default"
    onClick={props.onNameUpdateRequest}
    disabled={props.editingUserName === '' || props.UserName === props.editingUserName}
  />
 ```

- Now we have to feed this property from the parent control (Add `UserName={this.state.userName}` to the NameEditComponent in _src/app.tsx_). The `NameEditComponent` should be like:

 ```jsx
 <NameEditComponent
    UserName={this.state.userName}
    editingUserName={this.state.editingUserName}
    onEditingNameUpdated={this.updateEditingName.bind(this)}
    onNameUpdateRequest={this.setUsernameState.bind(this)}
 />
 ```


- Let's give a try

 ```
npm start
 ```
