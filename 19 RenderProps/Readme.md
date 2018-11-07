# Intro

In this sample we are going to learn how use render props in React.

In this case we will implement a component that will inject the session
to other components via render props.

The main advantage of using this approach instead of HOC is that the child component gets a clear contract of the props it receives.

# Steps

- Let's first add the component that will expose the render prop, we will append it to 
the sessionContext file.

_./src/common/sessionContext.tsx_

```diff
import * as React from "react"

export interface SessionContextProps {
  login: string;
  updateLogin: (value) => void;
}

export const createDefaultUser = (): SessionContextProps => ({
  login: 'no user',
  updateLogin: (value) => { },
});

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());

interface State extends SessionContextProps {
}

export class SessionProvider extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      login: createDefaultUser().login,
      updateLogin: this.setLoginInfo
    }
  }

  setLoginInfo = (newLogin) => {
    this.setState({ login: newLogin })
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  };
};

+ interface Props {
+  render : (login : string) => React.ReactNode;
+ }
+
+ export class Session extends React.Component<Props> {
+   constructor(props : Props) {
+     super(props);  
+   }
+ 
+   render() {    
+     return (
+       <SessionContext.Consumer>        
+         {          
+           ({ login, updateLogin }) => 
+             <>     
+             {this.props.render(login)}        
+             </>
+         }         
+       </SessionContext.Consumer>
+     )  
+   }  
+ }
```

- Now in the _pageB.tsx_ we can invoke it like that (first approach):

_./src/pages/b/pageB.tsx_

```jsx
import * as React from "react"
import { Link } from 'react-router-dom';
import { Session } from '../../common/'
import { checkPropTypes } from "prop-types";

export const PageB = () =>
  <div>
    <Session
        render={
          login => (            
                <>
                  <h2>Hello from page B</h2>
                  <br />
                  <br />
                  <h3>Login: {login}</h3>

                  <Link to="/">Navigate to Login</Link>
                </>
            )}
    >
    </Session>
  </div>
```

- Let's add one refactor to make the code more readable:

_./src/pages/b/pageB.tsx_

```jsx
import * as React from "react"
import { Link } from 'react-router-dom';
import { Session } from '../../common/'
import { checkPropTypes } from "prop-types";


interface Props {
  login : string;
}

const LoginComponent = (props: Props) =>
  <>
    <h2>Hello from page B</h2>
    <br />
    <br />
    <h3>Login: {props.login}</h3>

    <Link to="/">Navigate to Login</Link>
  </>


export const PageB = () =>
  <div>
    <Session
        render={
          login => (            
            <LoginComponent login={login}></LoginComponent>
            )}
    >
    </Session>
  </div>
```

> If you need to nest several render props, you can use _react-composer_: https://github.com/jamesplease/react-composer

