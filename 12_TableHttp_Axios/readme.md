# 12 Table Http with Axios

Let's move forward with the table sample, this time we are going to replace the
mock data by real one and we will make calls with the Axios package.

We will take a startup point sample _11 TableMock_:

## Summary steps:

- Configure transpilation and add extra transpile step babel >> es5.
- Update API in order to work with [Axios](https://github.com/axios/axios) and fetch data from Github API.
- Update the _tableComponent_ in order to show this data.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _11 TableMock_ and execute:

```
npm install
```

- We install the Axios package:

```
  npm install --save axios
```

- Let's remove the file _memberMockData.ts_ in _src/api_ directory.

- Let's replace _memberAPI_ load members with the fetch / promise one:

_./src/api/memberAPI.ts_

```javascript
import { MemberEntity } from '../model/member';
import Axios, { AxiosError, AxiosResponse } from 'axios';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  getAllMembers(): Promise<MemberEntity[]> {
    const gitHubMembersUrl: string = 'https://api.github.com/orgs/lemoncode/members';

    return Axios.get<MemberEntity[]>(gitHubMembersUrl)
      .then(this.resolveMembers)
      .catch(this.onError);
  }

  private onError(err: AxiosError): MemberEntity[] {
    console.log(err.message);
    return [];
  }

  private resolveMembers({ data }: AxiosResponse<MemberEntity[]>): MemberEntity[] {
    const members: MemberEntity[] = data.map(gitHubMember => {
      let member: MemberEntity = {
        id: gitHubMember.id,
        login: gitHubMember.login,
        avatar_url: gitHubMember.avatar_url,
      };

      return member;
    });

    return members;
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

- Now it's time to update our _membersTable_ component.

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
