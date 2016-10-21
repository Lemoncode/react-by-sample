import * as React from 'react';
import {MembersTable} from './membersTable';

interface State {
  userName : string;
}

export class App extends React.Component<{}, State> {
  public render() {
      return (
       <div>
        <MembersTable/>
       </div>
      );
 }
}
