# 15 Login form

In this sample we are going to implement a basic login page, that will redirect
the user to another page whenever the login has completed successfully.

We will attempt to create a [realistic layout](http://bootsnipp.com/snippets/featured/compact-login-form-bs-3), in order to keep simplicity we will
break it into subcomponents and perform some refactor in order to make the solution
more maintenable.

We will take a startup point sample _14 ReactRouter_:

Summary steps:

- Let's rename pageA to LoginPage.
- Let's create a 'Pages' subfolder and reorganize pages.
- Let's build the layout for this page.
- Let's add navigation on login button clicked.
- Let's add login validation fake api.
- Let's connect it into the login button logic.
- Let's do a bit of refactor and clean up extracting functionality to reusable components.
- Let's add some form validation (mandatory fields, minlength).

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _14 React Router_ and execute _npm install_.

- Let's rename _pageA.tsx_ to _loginPage.tsx_.

- Let's update as well the name of the component.

_./src/loginPage.tsx_

```javascript
import * as React from "react"
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div>
      <h2> Hello from page A</h2>
      <br/>
      <Link to="/pageB">Navigate to Page B</Link>
    </div>
  )
}
```

- Now it's time to reorganize the pages structure. Let's create a subfolders
called _pages_

- Under that subfolder let's create two more subfolders _login_ and _b_

- Let's place the _pages_ under that subfolders: _pages/login/loginPage.tsx_
and _pages/b/pageB.

```
.
└── src/
    │
    ├── model/
    └── pages/
        ├── login/
        │   └── loginPage.tsx
        └── b/
            └── pageB.tsx

```

- In some cases this pages will contain more secondary files, let's create
a simple _index.tsx_ file for each of this pages.

- Under _pages/login/index.ts.

_./src/pages/login/index.ts_

```javascript
export {LoginPage} from './loginPage';
```

- Under _pages/b/index.ts_

_./src/pages/b/index.ts_

```javascript
export {PageB} from './pageB';
```
- The structure look like this:

```
.
└── src/
    │
    └── pages/
        ├── login/
        │   ├── index.ts
        │   └── loginPage.tsx
        └── b/
            ├── index.ts
            └── pageB.tsx

```

- Let's update _main.tsx_ (routes, names and add a redirect from root to login page)

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import {PageA} from './pageA';
- import {PageB} from './pageB';
+ import {LoginPage} from './pages/login';
+ import {PageB} from './pages/b';

ReactDOM.render(
   <HashRouter>
     <Switch>
-       <Route exact={true} path="/" component={PageA} />
+       <Route exact={true} path="/" component={LoginPage} />
       <Route path="/pageB" component={PageB} />
     </Switch>
   </HashRouter>
  ,
  document.getElementById('root')
);
```

- Let's update as well the navigation from _pageB_ to _loginPage_, _pageB.tsx_

_./src/pages/b/pageB.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';

export const PageB = () => {
  return (
    <div>
      <h2>Hello from page B</h2>
      <br />
-      <Link to="/">Navigate to Page A</Link>      
+      <Link to="/login">Navigate to Login</Link>
    </div>
  )
}
```

- Let's make a quick test and check that everyting is still working fine.

```
npm start
```

- Let's build a proper _login_ layout, _loginPage.tsx_, we will base it in
the [following layout](http://bootsnipp.com/snippets/featured/compact-login-form-bs-3)
but we will break it down into subcomponents.

- To build a nice layout, we will install _@material-ui/core_

```bash
npm install @material-ui/core --save-dev
```

- Now we could create a login form it could look somethin like:

```javascript
import * as React from "react"
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: 400, 
    margin: '0 auto',   
  },
});

const LoginPageInner = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <TextField
            label="Name"
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const LoginPage = withStyles(styles)(LoginPageInner);
```

- This can be ok, but if we take a deeper look to this component, we could break down into two, one is the
card itself the other the form dialog, so it should finally look like:

** Proposal ** 

```javascript
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
```
- Let's create the loginformcomponent:

_./src/pages/login/loginForm.tsx_

```javascript
import * as React from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";

export const LoginForm = (props) => {
  const { classes } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <TextField
        label="Name"
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  )
}
```

- And let's update the _loginPage.tsx_

_./src/pages/loginPage.tsx_

```javascript
import * as React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {LoginForm} from './loginForm';

const styles = theme => ({
  card: {
    maxWidth: 400, 
    margin: '0 auto',   
  },
});

const LoginPageInner = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <LoginForm/>
      </CardContent>
    </Card>
  )
}

export const LoginPage = withStyles(styles)(LoginPageInner);
```

- Let's give a try and check how is it looking.

```bash
npm start
```

- Le'ts add the navigation on button clicked, we will do it in two steps.

- First we will expose a method to do that in the loginPage.

```diff
+ import { withRouter } from 'react-router-dom';
+ import {History} from 'history';

// ...

+ const styles = theme => ({
+  card: {
+    maxWidth: 400,
+    margin: '0 auto',
+  },
+ });

+ interface Props {
+   history: History;
+ }

const LoginPageInner = (props) => {
  const { classes } = props;

+   const onLogin = () => {
+       history.push('/pageB');      
+   }

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
-        <LoginForm/>
+        <LoginForm onLogin={onLogin}/>
      </CardContent>
    </Card>
  )
}

- export const LoginPage = withStyles(styles)(LoginPageInner);
+ export const LoginPage = withRouter(withStyles(styles)(LoginPageInner));
```

- Let's add the navigation on button clicked (later on we will check for user and pwd) _form.tsx_.
In order to do this we will use react-router 4 "withRouter" HoC (High order component).

_./src/pages/login/form.tsx_

```diff
import * as React from "react"
+ import { withRouter } from 'react-router-dom';

+ interface Props {  
+  onLogin : () => void;
+}

+export const LoginForm = (props : Props) => {
- export const LoginForm = () => {  
+  const { onLogin } = props;
  
  return (
    <div className="panel-body">
      <form accept-charset="UTF-8" role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" placeholder="E-mail" name="email" type="text"/>
      		</div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
          </div>
-          <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"
-          />
+          <button  type="button" className="btn btn-lg btn-success btn-block" onClick={OnLogin}>Login</button>                        
        </fieldset>
      </form>
    </div>
  );
- }
+})
```

- Let's give a quick try.

```bash
npm start
```

Ok, we can navigate whenever we click on the login page. 

- Let's keep on progressing, now is time to collect the username and password info, and check if
password is valid or not.

- Let's define an entity for the loginInfo let's create the following path and file
_src/model/login.ts_

```javascript
export interface LoginEntity {
  login : string;
  password : string;
}

export const createEmptyLogin = () : LoginEntity => ({
  login: '',
  password: '',
});
```

- Let's add login validation fake restApi: create a folder _src/api_. and a file called
_login.ts_

_./src/api/login.ts_

```javascript
import {LoginEntity} from '../model/login';

// Just a fake loginAPI
export const isValidLogin = (loginInfo : LoginEntity) : boolean =>
  (loginInfo.login === 'admin' && loginInfo.password === 'test');
```

- How it should look 

```
.
└── src/
    │
    ├── api/
    │   └── login.ts
    ├── model/
    │   └── login.ts
    └── pages/
        ├── login/
        │   ├── form.tsx
        │   ├── header.tsx
        │   ├── index.ts
        │   └── loginPage.tsx
        └── b/
            ├── index.ts
            └── pageB.tsx

```

- Now we can integrate it into _form.tsx_ login button, but.. it's  time to think
about how do we want to structure this, Do we want _form.tsx_ to hold the state
of current user logged in and current password, plus button handler? This should
be responsibility of the container control (Let's create a new component loginPageContainer.tsx). So let's the define as state of the _loginPageContainer_ this information plus function and pass it down to
the _loginPage_ and _form_ component. Let's start with _loginPageContainer_


- And update our main.tsx

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import { LoginPage } from './pages/login';
+ import { LoginPageContainer } from './pages/login';
import { PageB } from './pages/b';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact={true} path="/" component={LoginPageContainer} />
      <Route path="/pageB" component={PageB} />
    </Switch>
  </HashRouter>
  , document.getElementById('root')
);
```

- Let's add the _api_ integration, plus navigation on login succeeded:

- First let's create a login state and add the api integration.

_./src/pages/login/loginPage.tsx_

```diff
import * as React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { LoginForm } from './loginForm';
import { withRouter } from 'react-router-dom';
import {History} from 'history';
+ import { LoginEntity, createEmptyLogin } from '../../model/login';
+ import { isValidLogin } from '../../api/login';

+ interface State {
+   loginInfo: LoginEntity;
+ }

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

interface Props {
  history: History;
}

- const LoginPageInner = (props) => {
+   export const LoginPageContainer = withRouter(class LoginPageContainerInner extends React.Component<Props, State> {
-  const { classes, history } = props;

+  constructor(props) {
+    super(props);
+
+    this.state = { loginInfo: createEmptyLogin() }
+  }

-  const onLogin = () => {
+  onLogin = () => {  
+    if (isValidLogin(this.state.loginInfo)) {
+        this.props.history.push('/pageB');
-        history.push('/pageB');
+    }
  }

+  public render() {
+  const { classes } = this.props;

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <LoginForm onLogin={onLogin} />
      </CardContent>
    </Card>
  )
+  }
}

export const LoginPage = withStyles(styles)(withRouter(LoginPageInner));
```

- Now let's read the data from the textfields components (user and password).

_./src/pages/login/loginPage.tsx_

```diff
class LoginPageInner extends React.Component<Props, State> {

  onLogin = () => {
    if (isValidLogin(this.state.loginInfo)) {
      this.props.history.push('/pageB');
    }
  }

+  onUpdateLoginField = (name, value) => {
+    this.setState({loginInfo: {
+      ...this.state.loginInfo,
+      [name]: value,
+    }})
+  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Login" />
        <CardContent>
          <LoginForm 
            onLogin={this.onLogin} 
+            onUpdateField={this.onUpdateLoginField}
          />
        </CardContent>
      </Card>
    )

  }
}
```

_./src/pages/login/loginForm.tsx_

```diff
import * as React from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
+ import { LoginEntity } from "../../model/login";

interface Props {  
  onLogin : () => void;
+  updateField: (string, any) => void;
+  loginInfo : LoginEntity;
}

export const LoginForm = (props : Props) => {
-  const { onLogin } = props;
+  const { onLogin, updateField, loginInfo } = props;

+  const onTexFieldChange = (fieldId) => (e) => {
+    updateField(fieldId, e.target.value);
+  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <TextField
        label="Name"
        margin="normal"
+        value={loginInfo.login}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
+        value={loginInfo.password}
      />
      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}
```

- Let's display a notification when the login validation fails.

- First we will create a simple notification component, base on _react material ui_ _snackbar_

```javascript
import * as React from "react"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core";

interface Props {
  classes?: any;
  message: string;
  show: boolean;
  onClose: () => void;
}

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const NotificationComponentInner = (props: Props) => {
  const {classes, message, show, onClose } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}    
      open={show}
      autoHideDuration={3000}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      
    />
  )
}

export const NotificationComponent = withStyles(styles)(NotificationComponentInner);
```

- Let's expose this common component via an _index_ file.

_./src/common/index.tsx_

```javascript
export * from './notification';
```

- Now let's instantiate this in our _loginPage_

_./src/pages/login/loginPage.tsx_

```diff
import * as React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { LoginForm } from './loginForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { LoginEntity, createEmptyLogin } from '../../model/login';
import { isValidLogin } from '../../api/login';
+ import { NotificationComponent } from '../../common'

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

interface State {
  loginInfo: LoginEntity;
+   showLoginFailedMsg: boolean;
}


interface Props extends RouteComponentProps {
  classes?: any;
}

class LoginPageInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = { loginInfo: createEmptyLogin(),
+                   showLoginFailedMsg : false,
     }
  }

  onLogin = () => {
    if (isValidLogin(this.state.loginInfo)) {
      this.props.history.push('/pageB');
+    } else {
+      this.setState({showLoginFailedMsg: true});
+    }
  }

  onUpdateLoginField = (name: string, value) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [name]: value,
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardHeader title="Login" />
          <CardContent>
            <LoginForm onLogin={this.onLogin}
              onUpdateField={this.onUpdateLoginField}
              loginInfo={this.state.loginInfo}
            />
          </CardContent>
        </Card>
+        <NotificationComponent 
+          message="Invalid login or password, please type again"
+          show={this.state.showLoginFailedMsg}
+          onClose={() => this.setState({showLoginFailedMsg: false})}
+        />
      </>
    )

  }
}

export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

> And form validation? There are several libraries available, one that we had created in lemoncode
is lc-form-validation we will create a sample including this lib to validate the login form
(required fields)

