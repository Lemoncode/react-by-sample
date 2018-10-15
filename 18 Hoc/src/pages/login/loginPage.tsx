import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { LoginForm } from './loginForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LoginEntity, createEmptyLogin } from '../../model/login';
import { isValidLogin } from '../../api/login';
import { NotificationComponent } from '../../common'
import { LoginFormErrors, createDefaultLoginFormErrors } from './viewmodel';
import { loginFormValidation } from './loginValidations';
import {SessionContext, withSessionContext} from '../../common';
import { Session } from "inspector";

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});


interface State {
  loginInfo: LoginEntity;
  showLoginFailedMsg: boolean;
  loginFormErrors: LoginFormErrors;
}

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  updateLogin: (value) => void
}

class LoginPageInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      loginInfo: createEmptyLogin(),
      showLoginFailedMsg: false,
      loginFormErrors: createDefaultLoginFormErrors(),
    }
  }

  
  onLogin = () => {
    loginFormValidation.validateForm(this.state.loginInfo)
      .then((formValidatinResult) => {
        if(formValidatinResult.succeeded) {
          if (isValidLogin(this.state.loginInfo)) {
            this.props.updateLogin(this.state.loginInfo.login);
            this.props.history.push('/pageB');
          } else {
            this.setState({ showLoginFailedMsg: true });
          }      
        } else {
          alert('error, review the fields');
        }
      })
  }

  onUpdateLoginField = (name: string, value) => {
    this.setState({loginInfo: {
      ...this.state.loginInfo,
      [name]: value,
      }
    });

    loginFormValidation.validateField(this.state.loginInfo, name, value).then(
      (fieldValidationResult) => {
        this.setState({
          loginFormErrors: {
            ...this.state.loginFormErrors,
            [name]: fieldValidationResult,
          }
        });        
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader title="Login" />
          <CardContent>
            <LoginForm 
              onLogin={this.onLogin}
              onUpdateField={this.onUpdateLoginField}
              loginInfo={this.state.loginInfo}
              loginFormErrors={this.state.loginFormErrors} 
            />
          </CardContent>
        </Card>
        <NotificationComponent
          message="Invalid login or password, please type again"
          show={this.state.showLoginFailedMsg}
          onClose={() => this.setState({ showLoginFailedMsg: false })}
        />
      </>
    )

  }
}

export const LoginPage = withSessionContext(withStyles(styles)(withRouter<Props>((LoginPageInner))));
