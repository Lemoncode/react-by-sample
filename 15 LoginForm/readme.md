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
- Let's add some form validation (mandatory fields, minlength).

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _14 React Router_ and execute _npm install_.

- Let's rename _pageA.tsx_ to _loginPage.tsx_.

- Let's update as well the name of the component.

```javascript
import * as React from "react"
import {Link} from 'react-router';

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

- In some cases this pages will contain more secondary files, let's create
a simple _index.tsx_ file for each of this pages.

- Under _pages/login/index.ts.

```javascript
import {LoginPage} from './loginPage';

export {
  LoginPage
}
```

- Under _pages/b/index.ts_

```javascript
import {PageB} from './pageB'

export {
  PageB
}
```

- Let's update _main.tsx_ (routes and names)

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {LoginPage} from './pages/login';
import {PageB} from './pages/b';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={LoginPage}/>
      <Route path="/login" component={LoginPage} />
      <Route path="/pageB"  component={PageB} />
    </Route>
  </Router>

  , document.getElementById('root'));
```


- Let's update as well the navigation from _pageB_ to _loginPage_, _pageB.tsx_

```javascript
<Link to="/login">Navigate to Login</Link>
```

- Let's make a quick test and check that everyting is still working fine.

```
npm start
```


- Let's build a proper _login_ layout, _loginPage.tsx_, we will base it in
the [following layout](http://bootsnipp.com/snippets/featured/compact-login-form-bs-3)
but we will break it down into subcomponents.

- We will create under _src/pages/login/_ a component called _header.tsx_.

```javascript
import * as React from "react"

export const Header = () => {
  return (    
  	   <div className="panel-heading">
  	     <h3 className="panel-title">Please sign in</h3>
  	   </div>
  );
}
```

- We will create under _src/pages/login/_ a component called _form.tsx_

```javascript
import * as React from "react"

export const Form = () => {
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
          <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
        </fieldset>
      </form>
    </div>
  );
}
```


- Login Page will look something like that:

```javascript
import * as React from "react"
import {Link} from 'react-router';
import {Header} from './header';
import {Form} from './form'

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <Header/>
            <Form/>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- Let's add the navigation on button clicked (later on we will check for user and pwd) _form.tsx_.

```javascript
import * as React from "react"

import {hashHistory} from 'react-router'

export const Form = () => {

  function login() {
      hashHistory.push('/pageB');      
  }

  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" placeholder="E-mail" name="email" type="text"/>
      		</div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
          </div>
          <input className="btn btn-lg btn-success btn-block" value="Login"
            onClick={login}
          />
        </fieldset>
      </form>
    </div>
  );
}
```

- Let's define an entity for the loginInfo let's create the following path and file
_src/model/login.ts_

```javascript

export class LoginEntity {
  public login : string;
  public password : string;
}
```

- Let's add login validation fake restApi: create a folder _src/api_. and a file called
_login.ts_

```javascript
import {LoginEntity} from '../model/login';


// Just a fake loginAPI
class LoginAPI {
  public isValidLogin(loginInfo : LoginEntity) : boolean
  {
    return (loginInfo.login === 'test' && loginInfo.password === 'test');
  }
}

export const loginApi = new LoginAPI();
```


- Now we can integrate it into _form.tsx_ login button, but.. it's  time to think
about how do we want to structure this, Do we want _form.tsx_ to hold the state
of current user logged in and current password, plus button handler? This should
be responsibility of the container control (loginPage.tsx). So let's the define
as state of the _loginPage_ this information plus function and pass it down to
the _form_ component. Let's start with _loginPage_

```javascript
import * as React from "react"
import {Link} from 'react-router';
import {Header} from './header';
import {Form} from './form'
import {hashHistory} from 'react-router'
import {LoginEntity} from '../../model/login';
import {loginApi} from '../../restApi/login';

interface State {
  loginEntity : LoginEntity;
}

interface Props {

}


export class LoginPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {loginEntity: new LoginEntity()};
  }

  performLogin() {
      if(loginApi.isValidLogin(this.state.loginInfo)) {
         hashHistory.push('/pageB');
      }
  }

  updateLoginEntity(loginInfo : LoginEntity) {
    this.setState({loginInfo: loginInfo});
  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <Header/>
              <Form/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

- Let's now define the properties that the _form_ child controller will accept

```javascript
import * as React from "react"
import {hashHistory} from 'react-router'
import {LoginEntity} from '../../model/login';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : () => void;
}

export const Form = (props: Props) => {
```

- Let's apply this props in the components and propagate the login change.

```javascript
return (
  <div className="panel-body">
    <form role="form">
      <fieldset>
        <div className="form-group">
          <input className="form-control" placeholder="E-mail" name="email" type="text"
            value={props.loginInfo.login}
            onChange={(e : any) => props.updateLoginInfo({login: e.target.value, password: props.loginInfo.password })}
          />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Password" name="password" type="password"
            value={props.loginInfo.password}
            onChange={(e : any) => props.updateLoginInfo({login: props.loginInfo.login, password: e.target.value })}
          />
        </div>
        <input className="btn btn-lg btn-success btn-block" value="Login"
          onClick={(e) => {props.performLogin()}}
        />
      </fieldset>
    </form>
  </div>
);
```

- Now it's time to update the LoginPage again, including the properties that we have to pass
to the _form_ component

```javascript
<Form loginInfo={this.state.loginInfo}
      updateLoginInfo={this.updateLoginEntity.bind(this)}
      performLogin={this.performLogin.bind(this)}
      />
```

- Pending to implement (easy and discussion): add a red label indicating that login failed.
