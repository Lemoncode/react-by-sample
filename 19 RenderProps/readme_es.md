## Introducción

En este ejemplo vamos a aprender como usar render props en React.

En este caso implementaremos un componente que inyectará la sesión a otros componentes vía render props.

El principal ventaja de usar este aproximación en lugar de HOC es que el componente hijo obtiene un contrato de las propiedades que recibe.

Tomaremos como punto de entrada el ejemplo _18 Hoc_:

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Primero vamos a añadir el componente que expondrá el reder prop, lo añadiremos al fichero _sessionContext_.

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

- Ahora en _pageB.tsx_ podemos invocarlo como (primera aproximación):

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

- Vamos a añadir una refactorización para hacer el código más legible:

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

- Si necesitas anidar muchas reder props, puedes usar _react-composer_: https://github.com/jamesplease/react-composer