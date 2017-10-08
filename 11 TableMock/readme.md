# 11 TableMock

Let's render a table and use a child component to render each row.

We will start by just creating some mock data.

We will take a startup point sample _03 State_:

Summary steps:

- Define a model entity (we will call it _member_).
- Define a fake api (to take thing simple we will just make it synchronous)
- We will row component, we will call it _memberRow_.
- Create a table component, we will call it _memberTable_ and make use of _memberRow


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute _npm install_.

- Let's define a model entity in _src/model/member.ts_:

_./src/model/member.ts_

```javascript
export default class MemberEntity {
  id: number;
  login: string;
  avatar_url: string;

  constructor() {
    this.id = -1;
    this.login = "";
    this.avatar_url = "";
  }
}
```

- Let's create some mock data  in _src/api/memberMockData.ts_:

_./src/api/memberMockData.ts_

```javascript
import {MemberEntity} from '../model/member';

var	MembersMockData : MemberEntity[] =
	[
		{
      id: 1457912,
      login: "brauliodiez",
      avatar_url: "https://avatars.githubusercontent.com/u/1457912?v=3"
		},
    {
      id: 4374977,
      login: "Nasdan",
      avatar_url: "https://avatars.githubusercontent.com/u/4374977?v=3"
    }
	];

  export default MembersMockData;
```

- Define a fake api (to take thing simple we will just make it synchronous) in _src/api/memberAPI.ts_:

```javascript
import {MemberEntity} from '../model/member';
import MembersMockData from './memberMockData';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  //This would be performed on the server in a real app. Just stubbing in.
  private _clone (item) {
  	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
  };

  // Just return a copy of the mock data
  getAllMembers() : Array<MemberEntity> {
		return this._clone(MembersMockData);
	}
}

export const memberAPI = new MemberAPI();
```

- Now it's time jump into the interesting part, let's delete _hello.tsx_ and _nameEdit.tsx_.

- We are going to create an stateless component that will display a single row _memberRow.tsx_.

```javascript
import * as React from 'react';
import {MemberEntity} from './model/member';

export const MemberRow = (props: {member : MemberEntity}) => {

     return (
       <tr>
         <td>
           <img src={props.member.avatar_url} style ={{maxWidth: '150px'}}/>
         </td>
         <td>
           <span>{props.member.id}</span>
         </td>
         <td>
           <span>{props.member.login}</span>
         </td>
       </tr>
     );
}
```
We can't use max-widh in the param style in. We must write 'maxWidth' in the react components.

- Then we are going to implement a component that will display a list of members (and will
  make use of rows), _membersTable.tsx_:

```javascript
import * as React from 'react';
import {MemberEntity} from './model/member';
import {memberAPI} from './api/memberAPI';
import {MemberRow} from './memberRow';

interface Props extends React.Props<MembersTable> {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  members : Array<MemberEntity>
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export class MembersTable extends React.Component<Props, State> {

  constructor(props : Props){
        super(props);
        // set initial state
        this.state = {members: []};
  }


   // Standard react lifecycle function:
   // https://facebook.github.io/react/docs/component-specs.html
   public componentWillMount() {
     this.setState({members: memberAPI.getAllMembers()})
   }

   public render() {

       return (
        <div className="row">
          <h2> Members Page</h2>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Avatar
                </th>
                <th>
                  Id
                </th>
                <th>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.members.map((member : MemberEntity) =>
                  <MemberRow key={member.id} member = {member}/>
                )
              }
            </tbody>
          </table>
        </div>
       );
  }
}

```

- Let's update app.tsx

```javascript
import * as React from 'react';
import {MembersTableComponent} from './membersTable';

interface State {
  userName : string;
}

export class App extends React.Component<{}, State> {
  public render() {
      return (
       <div className="col-xs-12">
        <MembersTableComponent/>
       </div>
      );
 }
}

```

- Let's run the sample

```
npm start
```
