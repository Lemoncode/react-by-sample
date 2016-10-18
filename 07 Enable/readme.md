# 07 Enable


Let's continue with the update name sample, this time we want to disable the
"update" button when the input is empty or when the value hasn't changed.

We will take a startup point sample _06 MoveBacktOStateless_:

Summary steps:

- Add a condition to disable


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _06 MoveBacktoStateless_.

- Let's start by adding a condition to disable the field whenever is empty.

```
<input type="submit" value="Change"
  className="btn btn-default"
  onClick={props.onNameUpdateRequest}
  disabled={props.editingUserName === ''}
  />

```

- Now comes the tricky part, detect that the name hasn't changed. First we will
add a new property called _userName_ this one will hold the last accepted userName.

```javascript
interface Props {
  UserName : string;
  editingUserName : string;
  onEditingNameUpdated : (newEditingName : string) => any;
  onNameUpdateRequest : () => void;
}
```

- We will add to the enable condition one more test, checking if name has changed:

```javascript
<input type="submit" value="Change"
  className="btn btn-default"
  onClick={props.onNameUpdateRequest}
  disabled={props.editingUserName === '' || props.UserName === props.editingUserName}
  />

```

- Now we have to feed this property from the parent control:

```javascript
<NameEditComponent
  UserName={this.state.userName}
  editingUserName={this.state.editingUserName}
  onEditingNameUpdated={this.updateEditingName.bind(this)}
  onNameUpdateRequest={this.setUsernameState.bind(this)} />
</div>
```


- Let's give a try

```
npm start
```
