# Hoc

We are going to implement a High Order Component, this let us extract common functionallity and expose
it via composition.

# Steps

In the previous sample we had to create an intermediate _LoginPageInner2_ component in order to 
inject to the component the _loginInfo_ and _setLoginInfo_ fields from the Session context.

This boilerplate is a bit ugly, and it would be worse if we want to access that info from other pages.

By implementing an Hoc we can just create a reusable function that will make easier to access the
SessionContext consumer.

- We will start by creating our Hoc (let's add this at the bottom of the file).

_./src/common/sessionContext.tsx_

```javascript
export const withSessionContext = (Component) => (props) => (
  <SessionContext.Consumer>
    {
      ({ login, updateLogin }) => (
        <Component
          {...props}
          login={login}
          updateLogin={updateLogin}
        />
      )
    }
  </SessionContext.Consumer>
);
```

- Now let's import it in our loginPage.

_./src/pages/login/loginPage.tsx_

```diff
- import {SessionContext} from '../../common';
+ import {SessionContext, withSessionContext} from '../../common';
```

- And let's remove LoginPageInner2 and add our Hoc:

_./src/pages/login/loginPage.tsx_

```diff
- export const LoginPageInner2 = (props) => 
-  <>
-  <SessionContext.Consumer>
-    {
-      ({updateLogin}) => 
-      <LoginPageInner updateLogin={updateLogin} {...props}/>
-    }
-    
-  </SessionContext.Consumer>
-  </>

- export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner2)));
+ export const LoginPage = withSessionContext(withStyles(styles)(withRouter<Props>((LoginPageInner))));

```

- We can run and check that the sample is working.

> As an excercise create a Page C and make use of the Hoc.

> Nesting HOC's can make code difficult to read, we can use lodash flow
to alleviate this.
