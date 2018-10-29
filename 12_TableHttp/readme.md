# 12 Table Http

Let's move forward with the table sample, this time we are going to replace the
mock data by real one.

We will take a startup point sample _11 TableMock_:

## Summary steps:

- Configure transpilation and add extra transpile step babel >> es5.
- Update API in order to work with promises and fetch data from Github API.
- Update the _tableComponent_ in order to show this data.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _11 TableMock_ and execute:

  ```
  npm install
  ```

- Let's remove the file _mermberMockData.ts_ in _src/api_ directory.

- Just to provide support to old browsers let's install the following libraries:

```javascript
npm install whatwg-fetch --save-dev
```

- Let's replace _memberAPI_ load members with the fetch / promise one:

_./src/api/memberAPI.ts_

```javascript
import { MemberEntity } from '../model/member';
import {} from 'whatwg-fetch';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {

  // Just return a copy of the mock data
  getAllMembers() : Promise<MemberEntity[]> {
    const gitHubMembersUrl : string = 'https://api.github.com/orgs/lemoncode/members';

    return fetch(gitHubMembersUrl)
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response))
      .then((data) => this.resolveMembers(data));
  }

  private checkStatus(response : Response) : Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response : Response) : any {
    return response.json();
  }

  private resolveMembers (data : any) : Promise<MemberEntity[]> {
    const members = data.map((gitHubMember) => {
      var member : MemberEntity = {
        id: gitHubMember.id,
        login: gitHubMember.login,
        avatar_url: gitHubMember.avatar_url,
      };

      return member;
    });

    return Promise.resolve(members);
  }
}

export const memberAPI = new MemberAPI();

```
- Add a new component _memberHead_ to create the table's header:

_./src/memberHead.tsx_

```javascript
import * as React from 'react';
import { MemberEntity } from './model/member';

export const MemberHead = () =>
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
```

- Now it's time to update our _membersTable_ component. <br />

_./src/membersTable.tsx_

- Import the new component:

```diff

+ import { MemberHead } from './memberHead';

```

- Modify the render function:

```diff
-<thead>
- <tr>
-    <th>
-      Avatar
-    </th>
-   <th>
-      Id
-    </th>
-    <th>
-      Name
-    </th>
-  </tr>
- </thead>
+ <thead>
+    <MemberHead />
+ </thead>
```

- Let's consume the new promise base method to retrieve the users:

```diff
// Standard react lifecycle function:
// https://facebook.github.io/react/docs/component-specs.html
public componentDidMount() {
-  this.setState({members: memberAPI.getAllMembers()})
+  memberAPI.getAllMembers().then((members) =>
+    this.setState({members: members})
+  );
}
```

- Let's give a try and check the results

```
npm start
```
