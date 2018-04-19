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
    <li className="card-header">
      <h3 className="panel-title">{props.title}</h3>
    </li>
```

_./src/common/panel/components/body.tsx_

```tsx
import * as React from "react"

interface Props {
}

export const Body : React.StatelessComponent<Props> = (props) => 
  <div className="list-group-item">
    {props.children}
  </div>
```


_./src/common/panel/panel.tsx_

```tsx
import * as React from "react"
import {Body} from './components/body';
import {Header} from './components/header';

interface Props {
  title : string;
}

export const Panel : React.StatelessComponent<Props> = (props) =>  
    <div className="card">
      <ul className="list-group list-group-flush">
        <Header title={props.title}/>
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
      <div className="col-md-4 col-md-offset-4">
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

Let'start by converting the component from stateless to class component.

_./src/pages/login/loginPage.tsx_

```diff
import * as React from "react"
import {Link} from 'react-router-dom';
import {Header} from './header';
import {Form} from './form'
+ import {LoginEntity} from '../../model/login';

+ interface State {
+   loginInfo : LoginEntity;
+ }

+ interface Props {
+   history;
+ }

- export const LoginPage = () => {
+  export class LoginPage extends React.Component<Props, State> {
+
+   constructor(props) {
+     super(props);
+     this.state = {loginInfo: createEmptyLogin()};
+   }
+
+    public render() {
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
+    }  
  );
}
```
Now it's time to add the login api integration

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
import { Header } from './header';
import { Form } from './form'
import { LoginEntity, createEmptyLogin } from '../../model/login';
+ import { withRouter } from 'react-router-dom';
+ import { loginApi } from "../../api/login";

interface State {
  loginInfo: LoginEntity;
}

interface Props {
+ history : History;
}

- export class LoginPage extends React.Component<Props, State> {
+  export const LoginPage = withRouter(class LoginPageInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = { loginInfo: createEmptyLogin() };
  }

+  performLogin() {
+    if(loginApi.isValidLogin(this.state.loginInfo)) {
+       this.props.history.push('/pageB');
+    }
+  }

+  updateLoginEntity(loginInfo : LoginEntity) {
+    this.setState({loginInfo: loginInfo});
+  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <Header />
              <Form />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

- Let's now define the properties that the _form_ child controller will accept

_./src/pages/login/form.tsx_

```diff
import * as React from "react";
import { withRouter } from 'react-router-dom';
+ import {LoginEntity} from '../../model/login';

+ interface Props {
+   loginInfo : LoginEntity;
+   updateLoginInfo : (loginInfo : LoginEntity) => void;
+   performLogin : () => void;
+   history;
+ }


-export const Form = withRouter((props: Props) => {
+ export const Form = (props: Props) => {  
-  const login = () => {
-    history.push('/pageB');      
-  }
    
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
          <button className="btn btn-lg btn-success btn-block" onClick={login}>Login</button>                        
        </fieldset>
      </form>
    </div>
  );
+ }
- });
```

- Let's apply this props in the components and propagate the login change.

_./src/pages/login/form.tsx_

```diff
  return (
    <div className="panel-body">
      <form accept-charset="UTF-8" role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" 
                   placeholder="E-mail" 
                   name="email" 
                   type="text"
+                  value={props.loginInfo.login}
+                  onChange={(e : any) => props.updateLoginInfo({login: e.target.value, password: props.loginInfo.password })}                   
            />
      		</div>
          <div className="form-group">
            <input className="form-control" 
                   placeholder="Password" 
                   name="password" 
                   type="password" value=""
+                  value={props.loginInfo.password}
+                  onChange={(e : any) => props.updateLoginInfo({login: props.loginInfo.login, password: e.target.value })}
            />
          </div>
          <button className="btn btn-lg btn-success btn-block" onClick={login}>Login</button>                        
        </fieldset>
      </form>
    </div>
  );
```

- Now it's time to update the LoginPage again, including the properties that we have to pass
to the _form_ component

```diff
- <Form />
+ <Form loginInfo={this.state.loginInfo}
+      updateLoginInfo={this.updateLoginEntity.bind(this)}
+      performLogin={this.performLogin.bind(this)}
+      />
```

- Congratulations, you already have the example running. It is time to do some refator and clean up.

- First we will extract all the divs in charge of generate a centered container to a new common centeredContainer component.

- Create a folder _pages\common_ and a file _centered.tsx_ underneath

```javascript
import * as React from "react"

interface Props {
   children? : any;
}

export const CenteredContainer = (props: Props) => {
  return (    
      <div className="container">
          <div className="row">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel panel-default">
                        {props.children}
                  </div>
              </div>
          </div>
      </div>
  );
}
```

- Add a new _index.ts_ file to the same folder

```javascript
import {CenteredContainer} from './centered'

export {
  CenteredContainer
}
```

- Now we have a component that can be used to center its content, lets use it in our _loginPage.tsx_, the render function should look like this 

```javascript
public render() {
    return (
      <CenteredContainer>
        <Header />
        <Form loginInfo={this.state.loginInfo}
          updateLoginInfo={this.updateLoginEntity.bind(this)}
          performLogin={this.performLogin.bind(this)}
          />
      </CenteredContainer>
    );
  }
```

> Now you an test the solution, try _npm start_ and if you enter the combination _test_ _test_ it wil navigate to page b.

- Time now to do some clean up in the form component, lets start creating a _formField.tsx_ file in the _common_ folder

```javascript
import * as React from "react"

interface Props {
   text : string;
   name : string;
   type : string;
   value?: string;
   updateFieldValue : (fieldName: string, fieldValue: any) => void;
}

export const FormField = (props: Props) => {


  return (
      <div className="form-group">
          <input className="form-control" 
                placeholder={props.text} 
                name={props.name} 
                type={props.type}
                value={props.value}
                onChange={(e: any) => props.updateFieldValue(props.name, e.target.value)}
              />
      </div>
  );
}
```

- And add it to the _index.ts_ in the same folder

```javascript
import {CenteredContainer} from './centered'
import {FormField} from './formField'

export {
  CenteredContainer,
  FormField
}
```

- Finally the structure look like this:

```
.
└── src/
    │
    ├── api/
    │   └── login.ts
    ├── model/
    │   └── login.ts
    ├── pages/
    │   ├── login/
    │   │   ├── form.tsx
    │   │   ├── header.tsx
    │   │   └── loginPage.tsx
    │   ├── common/
    │   │   ├── centered.tsx
    │   │   ├── formField.tsx
    │   │   └── index.ts
    │   │   ├── index.ts
    │   └── b/
    │       ├── index.ts
    │       └── pageB.tsx
    ├── restApi/
    │   └── login.ts
    ├── app.tsx
    ├── index.html
    └── main.tsx
    

```

- As you can see in the code above, now we have a component that can be used 
to define any input field within a form and which will inform of the value changes 
to the parent component. Time to use it!

```javascript
import * as React from "react"
import {hashHistory} from 'react-router'
import {LoginEntity} from '../../model/login';
import {FormField} from '../common/formField';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : () => void;
}

 function updateFieldValue(fieldName: string, fieldValue: any){
    const newLoginEntity = this.props.loginInfo;
    newLoginEntity[fieldName] = fieldValue;
    this.props.updateLoginInfo(newLoginEntity);
  }

export const Form = () => {
    return (
      <div className="panel-body">
        <form role="form">
          <fieldset>
            <FormField name="login" type="text" text="E-mail" updateFieldValue={this.updateFieldValue.bind(this)} />
            <FormField name="password" type="password" text="Password" updateFieldValue={this.updateFieldValue.bind(this)} />
            <input className="btn btn-lg btn-success btn-block" value="Login"
              onClick={(e) => { this.props.performLogin() } }
              />
          </fieldset>
        </form>
      </div>
    );
}
```
- Pay attention to the new _updateFieldValue_ function which will be in charge of 
receive changes in all the fields within the form and pass it to the parent component as a new LoginEntity

- Pending to implement (easy and discussion): add a red label indicating that login failed.
