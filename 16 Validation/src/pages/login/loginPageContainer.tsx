import * as React from "react"
import { LoginPage } from './loginPage';
import { LoginEntity, createEmptyLogin } from '../../model/login';
import { withRouter } from 'react-router-dom';
import { isValidLogin } from '../../api/login';
import { dataValidation } from './validation'
import {LoginFormErrors, createEmptyDataFormErrors} from './viewmodel';

interface State {
  loginInfo: LoginEntity;
  loginFormErrors : LoginFormErrors;
}

interface Props {
  history;
}

export const LoginPageContainer = withRouter(class LoginPageContainerInner extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { loginInfo: createEmptyLogin(), loginFormErrors: createEmptyDataFormErrors()}
  }

  performLogin = () => {
    if (isValidLogin(this.state.loginInfo)) {
      this.props.history.push('/pageB');
    }
  }

  updateLoginField = (name, value) => {
    dataValidation.validateField(this.state.loginInfo, name, value)
      .then((fieldValidationResult) => {

        this.setState({
            loginFormErrors: {
              ...this.state.loginFormErrors,
              [name]: fieldValidationResult,
            }
          });

        this.setState({
          loginInfo: {
            ...this.state.loginInfo,
            [name]: value,
          }
        });
      });
  }

  public render() {
    return (
      <LoginPage
        loginInfo={this.state.loginInfo}
        updateField={this.updateLoginField}
        doLogin={this.performLogin}
        loginFormErrors={this.state.loginFormErrors} 
      />
    )
  }
})
