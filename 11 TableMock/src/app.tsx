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
