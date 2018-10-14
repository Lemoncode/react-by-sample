# Intro

In this sample we are going to learn how React 16 context api works.

This will allow us to share information between components without having 
to go through props drilldown or having to add redux support to our project.

# Steps

- We want to store just the _login_ field once the user logs in and display it 
in the page B (or in wathever page or component we need it), let's add a 
default value ('no user').

- Let's start by creating a context, we will call it _sessionContext_, and add the proper typing

_./src/common/sessionContext.tsx_

```javascript
import * as React from "react"

export interface SessionContextProps {
  login : string;
} 
export const createDefaultUser = () : SessionContextProps => ({
  login: 'no user',
});

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());
```

- This session context will expose a _provider_ (will serve us to set the login name in the context), 
and a _consumer_ (will let us consume the login name from the context from any point of the application).
We will create a component (we will name it _SessionProvider) that on one hand will store in the state
the login name and bind it to the _SessionContext_ and in the other hand it act as a wrapper (usually
it will sit on top of the application and wrap the application).

_./src/common/sessionContext.tsx_

```diff
import * as React from "react"

export interface SessionContextProps {
  login : string;
} 

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());

+ interface State extends SessionContextProps {
+ }
+
+ export class SessionProvider extends React.Component<{}, State> {
+
+  constructor(props) {
+    super(props);
+    this.state = createDefaultUser();
+  }
+
+  render() {
+    return (
+      <SessionContext.Provider value={this.state}>
+        {this.props.children}
+      </SessionContext.Provider>     
+  )};
+ };
```

- Let's add this to the common _index_ barrel.

_./src/common/index.tsx_

```diff
export * from './notification';
+ export * from './sessionContext';
```

- Is time to expose this provider on top of our application.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { PageB } from './pages/b';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
+ import {SessionProvider} from './common'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
+   <SessionProvider>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LoginPage} />
          <Route path="/pageB" component={PageB} />
        </Switch>
      </HashRouter>
+   </SessionProvider>
  </MuiThemeProvider>
  , document.getElementById('root')
);
```

- On pageB let's consume the sessionContext user name.

_./src/pages/b/pageB.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
+ import {SessionContext} from '../../common/'

export const PageB = () =>
    <div>
+      <SessionContext.Consumer>
+      {
+        ({login}) => (
+          <>
            <h2>Hello from page B</h2>
+           <br/>
+           <h3>Login: {login}</h3>            
            <br />
            <Link to="/">Navigate to Login</Link>
+          </>
+        )
+      }
+      </SessionContext.Consumer>
    </div>
```

- If we ran the sample we can navigate to page B and see the default login name being displayed

```bash
npm start
```

- Showing a default name is not a bad thing, but we need to display the real login name 
entered by the user, to do this we will expose a function into our context that
will let any consumer update the value.

_./src/common/sessionContext.tsx_

```diff
```

- Now let's apply this on the loginPage.

First let's add an update login method.

_./src/pages/login/loginPage.tsx_

```diff
export interface SessionContextProps {
  login: string;
+ updateLogin: (value) => void;  
}

export const createDefaultUser = () : SessionContextProps => ({
  login: 'no user',
+ updateLogin: (value) => {},
});
```

- Let's configure this in the provider state.


```diff
export class SessionProvider extends React.Component<{}, State> {

  constructor(props) {
    super(props);
-    this.state = createDefaultUser();
+    this.state = {
+       login: createDefaulUser.login,
+       updateLogin: this.setLoginInfo      
+    }
  }

+  setLoginInfo = (newLogin) => {
+    this.setState({login: newLogin})
+  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  };
};
```

- Time to setup this value when we click on the login button.

- Let's add an import to our context.

_./src/pages/login/loginPage.tsx_

```diff
+ import {SessionContext} from '../../common';
```

- Let's update our login component property to accept the setLogin method.

_./src/pages/login/loginPage.tsx_

```diff
interface Props extends RouteComponentProps, WithStyles<typeof styles> {
+   updateLogin: (value) => void
}
```
- We will create an intermediate component (in our next sample we will port it to a generic Hoc).

_./src/pages/login/loginPage.tsx_

```diff
+ export const LoginPageInner2 = (props) => 
+  <>
+  <SessionContext.Consumer>
+    {
+      ({updateLogin}) => 
+      <LoginPageInner updateLogin={updateLogin} {...props}/>
+    }
+    
+  </SessionContext.Consumer>
+  </>

- export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
+ export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner2)));

```

- Let's call the setLogin once the user clicks.

_./src/pages/login/loginPage.tsx_

```diff
  onLogin = () => {
    loginFormValidation.validateForm(this.state.loginInfo)
      .then((formValidatinResult) => {
        if(formValidatinResult.succeeded) {
          if (isValidLogin(this.state.loginInfo)) {
+            this.props.updateLogin(this.state.loginInfo.login);
            this.props.history.push('/pageB');
          } else {
            this.setState({ showLoginFailedMsg: true });
          }      
        } else {
          alert('error, review the fields');
        }
      })
  }
```

- If we run the app we can check that now we get the right result.

```bash
npm start
```

> Bonus check react-recompose

