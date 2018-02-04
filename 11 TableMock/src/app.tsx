import * as React from 'react';
import {MembersTableComponent} from './membersTable';

interface State {
  userName : string;
}

export class App extends React.Component<{}, State> {
  public render() {
      return (
       <div>
        <MembersTableComponent/>
       </div>
      );
 }
}
