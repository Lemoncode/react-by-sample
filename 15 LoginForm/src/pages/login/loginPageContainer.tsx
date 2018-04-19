import * as React from "react"
import {LoginPage} from './loginPage';
import {LoginEntity, createEmptyLogin} from '../../model/login';

interface State {
  loginInfo: LoginEntity;
}

interface Props {
  history;
}

export class LoginPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {loginInfo : createEmptyLogin()}
  }

  public render() {
    return (
      <LoginPage/>
    )
  }

}
