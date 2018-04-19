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
export {PageB} from './pageB'
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

- It's time to create something reusable, a panel is a good candidate for that.

Our idea is to end up with something like:
**PSEUDCODE**

```html
<Panel title="My title here">
  // My content here
</Panel>
```
And the panel it self

```html
<div class="panel panel-default">
  <header title={props.title}/>
  <body>
    {children}
  </body>
</div>
```

> Panels and Bootstrap 4 (cards): https://getbootstrap.com/docs/4.0/components/card/

_./src/common/panel/components/header.tsx_
```tsx
import * as React from "react"

interface Props {
  title : string;
}

export const Header = (props : Props) =>  
    <div className="card-header">
      <h3 className="panel-title">{props.title}</h3>
    </div>
```

_./src/common/panel/components/body.tsx_

```tsx
import * as React from "react"

interface Props {
}

export const Body : React.StatelessComponent<Props> = (props) => 
  <li className="list-group-item">
    {props.children}
  </li>
```


_./src/common/panel/panel.tsx_

```tsx
export const Panel: React.StatelessComponent<Props> = (props) =>
  <div className="card">
    <Header title={props.title} />
    <ul className="list-group list-group-flush">
      <Body>
        {props.children}
      </Body>
    </ul>
  </div>
```

_./src/common/panel/index.ts_

```typescript
export {Panel} from './panel';
```

> How do we end up doing this nice common component? Just by first doing it in the non optimal
way and go refining / refactoring, ... not often you get the perfect design at first try, it's
an iterative process.

- Let's create one more index file for the _common_ folder (that will grow).

_./src/common/index.ts_

```typescript
export {Panel}  from './panel';
```

- Let's jump back into our login pages, let's create a form component

_./src/pages/login/components/form.tsx_

```tsx
import * as React from "react"

export const Form = () => {
  return (
    <form role="form">
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
  );
}
```

- Now let's update our login page (fully replace the content)

_./src/pages/login/loginPage.tsx_

```javascript
import * as React from "react"
import {Panel} from '../../common';
import {Form} from './components/form';

export const LoginPage = () =>
  <Panel title="Please sign in">
    <Form/>
  </Panel>
```

- Let's give a try and check how is it looking.

```bash
npm start
```

-

- Let's add the navigation on button clicked (later on we will check for user and pwd) _form.tsx_.
In order to do this we will use react-router 4 "withRouter" HoC (High order component).

_./src/pages/login/form.tsx_

```diff
import * as React from "react"
+ import { withRouter } from 'react-router-dom';


- export const Form = () => {
+ export const Form = withRouter(({history}) => {  
+   const login = () => {
+       history.push('/pageB');      
+   }
  
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
+          <button className="btn btn-lg btn-success btn-block" onClick={login}>Login</button>                        
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

- Not bad, but we rather prefer to center the dialog, instead of getting our control dirty with
bootstrap grid sizes let's create another component.

> To make this component fully reusable it will need some tweaking, as an excercise you can play with
it adding some props to make it generic.

_./src/common/content-center/content-center.tsx_

```tsx
import * as React from "react"

export const ContentCenter : React.StatelessComponent = (props) => 
  <div className="container">
    <div className="row">
      <div className="mx-auto">
      {props.children}
      </div>
    </div>
  </div>
```

- Let's add it to our common _index.ts_

_./src/common/index.ts_

```diff
export {Panel}  from './panel';
+ export {ContentCenter} from './content-center/content-center';
```

- Let's add it to our _loginPage.tsx_

```diff
import * as React from "react"
- import {Panel} from '../../common';
+ import {Panel, ContentCenter} from '../../common';
import {Form} from './components/form';

export const LoginPage = () =>
+ <ContentCenter>
    <Panel title="Please sign in">
      <Form/>
    </Panel>
+  </ContentCenter>

```

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

_./src/api/login.ts_

```javascript
import {LoginEntity} from '../model/login';

// Just a fake loginAPI
export const isValidLogin = (loginInfo : LoginEntity) : boolean =>
  (loginInfo.login === 'admin' && loginInfo.password === 'test');
```


- Now we can integrate it into _form.tsx_ login button, but.. it's  time to think
about how do we want to structure this, Do we want _form.tsx_ to hold the state
of current user logged in and current password, plus button handler? This should
be responsibility of the container control (Let's create a new component loginPageContainer.tsx). So let's the define as state of the _loginPageContainer_ this information plus function and pass it down to
the _loginPage_ and _form_ component. Let's start with _loginPageContainer_


- Let's create a _loginPageContainer.ts_

_./src/pages/login/loginPageContainer.tsx_

```tsx
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
```

- Let's replace the component in the index we have:

_./src/pages/login/index.ts_

```diff
- export {LoginPage} from './loginPage';
+ export {LoginPageContainer} from './loginPageContainer';
```

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

_./src/pages/login/loginPageContainer.tsx_

```diff
import * as React from "react"
import {LoginPage} from './loginPage';
import {LoginEntity, createEmptyLogin} from '../../model/login';
+ import { withRouter } from 'react-router-dom';
+ import {isValidLogin} from '../../api/login';


interface State {
  loginInfo: LoginEntity;
}

interface Props {
+ history;
}

- export class LoginPageContainer extends React.Component<Props, State> {
+  export const LoginPageContainer = withRouter(class LoginPageContainerInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {loginInfo : createEmptyLogin()}
  }

+  performLogin = () => {
+    if(isValidLogin(this.state.loginInfo)) {
+       this.props.history.push('/pageB');
+    }
+  }


  public render() {
    return (
      <LoginPage/>
    )
  }
- }
+ })
```

- So far so good, let's recap:
  - We will hold the login info in the container state.
  - We have a method in the container that will perform the login action.
  - All this will be passed down vía props to the loginPage component.

What do we have missing?

  - A way to notify when the user has typed on a given input filed (method callback to update the login entity).
   

How are we going to do this?

  - We will map each field name with the property name of the control that will be targeted.
  - By doing this, the OnChange event can propagate the change and inform about the field that have
  changed (we could use a data attribute if we don't want to messup with name).

> What happens if we have nested property? We can use the full name, then using lodash or ramda helpers
we can access the property name via the string that has _field.subfield_ like format.

- Let's get started, first we are going to create a method in the container to update a field value:

```diff
export const LoginPageContainer = withRouter(class LoginPageContainerInner extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { loginInfo: createEmptyLogin() }
  }

  performLogin = () => {
    if (isValidLogin(this.state.loginInfo)) {
      this.props.history.push('/pageB');
    }
  }

+  updateLoginField = (name, value) => {
+    this.setState({loginInfo: {
+      ...this.state.loginInfo,
+      [name]: value,
+    }})
+  }
```

- Let's pass down this info to the loginPage:

_./src/pages/login/loginPage.tsx_

```diff
import * as React from "react"
import {Panel, ContentCenter} from '../../common';
import {Form} from './components/form';
+ import { LoginEntity } from "../../model/login";

+ interface Props {
+  loginInfo: LoginEntity;
+  updateField : (string, any) => void;
+  doLogin : () => void;
+ }

- export const LoginPage = () =>
+ export const LoginPage = (props : Props) =>
  <ContentCenter>
    <Panel title="Please sign in">
      <Form/>
    </Panel>
  </ContentCenter>
```

- First use the new properties when instantiating _loginPage_ in the _container_:

```diff
  public render() {
    return (
-      <LoginPage />
+      <LoginPage
+        loginInfo={this.state.loginInfo.}
+        updateField={this.updateLoginField}
+        doLogin={this.performLogin}
+      />
    )
  }
```

- Now it's time to pass it down to the form, same approach as with the container

_./src/pages/login/components/form.tsx_

```diff
import * as React from "react"
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import { LoginEntity } from "../../../model/login";

interface Props {
  loginInfo: LoginEntity;
  updateField: (string, any) => void;
  doLogin: () => void;  
}


- export const Form = withRouter((props : RouteComponentProps<Props>) => {
  export const Form = (props : Props) =>  
-  const login = () => {
-      history.push('/pageB');      
-  }
  
+  const onChange = (props : Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
+    props.updateField(e.target.name, e.target.value);
+  }

-  return (
    <form role="form">
      <fieldset>
        <div className="form-group">
          <input className="form-control" 
                 placeholder="E-mail" 
-                 name="email"
+                 name="login"
                 type="text"
+                 onChange={onChange(props)}
+                 value={props.loginInfo.login}
                 />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
        </div>
        <button className="btn btn-lg btn-success btn-block" 
-                onClick={login}
+                onClick={doLogin}
        >Login</button>   
      </fieldset>
    </form>  
-  );
});

```

- Let's update how we instantiate the form into the loginPage:

```diff
export const LoginPage = (props : Props) =>
  <ContentCenter>
    <Panel title="Please sign in">
      <Form
+        {...props} 
      />
    </Panel>
  </ContentCenter>

```

- We can debug and check that we get all the wheels and cogs working.

```bash
npm start
```

> One refinement... this looks like we could wrap all this into a common input and use it
in any form saving some lines of code and hiding complexity, let's go for that:

- Time for the password field

_./src/pages/login/components/form.tsx_

```diff
<input className="form-control" 
      placeholder="Password" 
      name="password" 
      type="password" 
+      onChange={onChange(props)}
+      value={props.loginInfo.password}
      />
```

- Let's give a try

```
npm start
```

> And form validation? There are several libraries available, one that we had created in lemoncode
is lc-form-validation we will create a sample including this lib to validate the login form
(required fields)

> As an excercise add a react toaster to notify when the login fails.

> One more excercise port this layout to flexbox and new CSS standards.