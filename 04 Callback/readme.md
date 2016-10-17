# 04 Callback + State

In this sample we are going to add some refactor to the previous sample _03 State_

In this case we are going to update the name property only when the user cliks on
a _change_ button, we will simplify as well the event itself.


We will take a startup point sample _03 State_:

Summary steps:

- Add a button to the _EditName_ component and a handler for this.
- Submit the name only when the user clicks on the button.
- Update _app_ component to handle the new simplified event.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute _npm install_.

 - Since we are going to use an internal handler, let's transform this stateless
 components, into a class component, and let's add some refactor on the naming.

 ```javascript
 import * as React from 'react';

 interface Props {
   initialUserName : string;
   onNameUpdated : (newName : string) => any;
 }

 interface State {
   editingName : string;
 }

 export class NameEditComponent extends React.Component<Props, State> {
   constructor(props: Props) {
     super(props);

     // Watch out what would happen if we get this user name via an AJAX callback
     // you will find a different implementatin on 05 sample
     this.state = {editingName: props.initialUserName};
   }

   onChange(event : any) : any {
     this.setState({editingName: event.target.value} as State);
   }


   onNameSubmit(event : any) : any {
         this.props.onNameUpdated(this.state.editingName);
   }

   public render() {
       return (
         <div>
           <label>Update Name:</label>
           <input value={this.state.editingName} onChange={this.onChange.bind(this)}/>
           <input type="submit" value="Change" className="btn btn-default" onClick={this.onNameSubmit.bind(this)} />
         </div>
       );
  }
 }

 ```

- Let's wire this up in the app.tsx

```javascript
export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {userName: "defaultUserName"};
  }

  setUsernameState(newName : string) {
    this.setState({userName: newName});
  }

  public render() {
      return (
       <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent initialUserName={this.state.userName} onNameUpdated={this.setUsernameState.bind(this)} />
       </div>
      );
 }
}
```

Now we have got a clear event, strongly typed and simplified (straight forward).

- Let's give a try:

```
npm start
```
