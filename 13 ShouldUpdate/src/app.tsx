import * as React from 'react';
import {FaceComponent} from './face'

interface Props {

}

interface State {
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
      return (
       <div>
          <FaceComponent level ={100}/>
       </div>
      );
 }
}
