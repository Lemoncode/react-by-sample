# 12 Table Http

Let's move forward with the table sample, this time we are going to replace the
mock data by real one.

We will take a startup point sample _11 TableMock_:

Summary steps:

- Install promises dependencies and typescript definitions.
- Update API in order to work with promises and fetch data from Github API.
- Update the _tableComponent_ in order to show this data.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _11 TableMock_ and execute _npm install_.

- Let's add the dependencies to manage promises and typescript definitions

```
npm install core-js --save-dev
```

```
npm whatwg-fetch --save
```

```
npm install @types/core-js --save-dev
```
```
npm install @types/whatwg-fetch --save-dev
```

- Let's remove the fil _mermberMockData.tsx_

- Let's replace _memberAPI_ load members with the fetch / promise one.

```javascript
import {MemberEntity} from '../model/member';
import {} from 'whatwg-fetch';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {

  // Just return a copy of the mock data
  getAllMembers() : Array<MemberEntity> {
    const gitHubMembersUrl : string = 'https://api.github.com/orgs/lemoncode/members';

    return fetch(gitHubMembersUrl)
    .then((response) => this.checkStatus(response))
    .then((response) => this.parseJSON(response))
    .then((data) => this.resolveMembers(data))
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
      var member : MemberEntity = new MemberEntity();

      member.id = gitHubMember.id;
      member.login = gitHubMember.login;
      member.avatar_url = gitHubMember.avatar_url;

      return member;
    });


    return Promise.resolve(members);
  }
}

export const memberAPI = new MemberAPI();
```

- Now it's time to update our _membersTable_ component, let's consume the new
promise base method to retrieve the users.

```javascript

```
