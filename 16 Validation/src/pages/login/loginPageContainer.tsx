import * as React from "react"
import { LoginPage } from './loginPage';
import { LoginEntity, createEmptyLogin } from '../../model/login';
import { withRouter } from 'react-router-dom';
import { isValidLogin } from '../../api/login';
import { dataValidation } from './validation'
import {LoginFormErrors, createEmptyDataFormErrors} from './viewmodel';
import { FormValidationResult } from "lc-form-validation";

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

  // We could apply clean code here break into two functions
  performLogin = () => {
    dataValidation.validateForm(this.state.loginInfo)
      .then((FormValidationResult) => {
          if(FormValidationResult.succeeded) {
            if (isValidLogin(this.state.loginInfo)) {
              this.props.history.push('/pageB');
            }      
          } else {
            alert('error, review the fields');
          }
      })
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
