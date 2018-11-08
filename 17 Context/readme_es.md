# Intro

En este ejemplo vamos a aprender cómo funciona la api de context en React 16.

Esto nos permitirá compartir información entre componentes sin tener que ir añadiendo propiedades por todo el árbol o tener que añadir redux a nuestro proyecto.

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

Vamos a tomar como punto de partida el ejemplo _16 Validation_:

## Pasos para construirlo

- Queremos guardar el campo de _login_ una vez el usuario inicie sesión y mostrarlo en la página B (o en cualquier página o componente que lo necesite), vamos a añadir un valor por defecto ('no user').

- Empezaremos por crear un contexto, lo llamaremos _sessionContext_, y añadiremos los tipos apropiados

_./src/common/sessionContext.tsx_

```javascript
import * as React from "react";

export interface SessionContextProps {
  login: string;
}

const createDefaultUser = (): SessionContextProps => ({
  login: 'no user',
});

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());
```

- Este contexto de sesión expondrá un _proveedor_ (que nos servirá para establecer el nombre de inicio de sesión en el contexto), y un _consumidor_ (que nos permitirá consumir el nombre de inicio de sesión del contexto en cualquier punto de la aplicación).
Crearemos un componente (lo llamaremos _SessionProvider_) que por un lado guardará en el estado el nombre del login y lo atará a _SessionContext_ y por otro lado acturá como un envoltorio (normalmente está al principio de la aplicación y envuelve la aplicación).

_./src/common/sessionContext.tsx_

```diff
import * as React from "react";

export interface SessionContextProps {
  login: string;
}

const createDefaultUser = (): SessionContextProps => ({
  login: 'no user',
});

export const SessionContext = React.createContext<SessionContextProps>(createDefaultUser());

+ interface State extends SessionContextProps {
+ }
+
+ export class SessionProvider extends React.Component<{}, State> {
+
+   constructor(props) {
+     super(props);
+     this.state = createDefaultUser();
+   }
+
+   render() {
+     return (
+       <SessionContext.Provider value={this.state}>
+         {this.props.children}
+       </SessionContext.Provider>
+     );
+   }
+ }
```

- Vamos a añadirlo a un _index_ barrel común.

_./src/common/index.tsx_

```diff
export * from './notification';
+ export * from './sessionContext';
```

- Es hora de exponer este proveedor al principio de nuestra aplicación.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { PageB } from './pages/b';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
+ import { SessionProvider } from './common';

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
  </MuiThemeProvider>,
  document.getElementById('root')
);
```

- En la página B consumiremos el campo login de SessionContext.

_./src/pages/b/pageB.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
+ import { SessionContext } from '../../common';

export const PageB = () =>
  <div>
+   <SessionContext.Consumer>
+   {
+     ({login}) => (
+       <>
         <h2>Hello from page B</h2>
+        <br/>
+        <h3>Login: {login}</h3>
         <br />
         <Link to="/">Navigate to Login</Link>
+       </>
+     )
+   }
+   </SessionContext.Consumer>
  </div>
```

- Si ejecutamos el ejemplo podemos navegar a la página B y ver  el nombre por defecto.

```bash
npm start
```

- No es malo mostrar un nombre por defecto, pero necesitamos mostrar el nombre que introduzca el usuario, para hacer esto expondremos una función dentro de nuestro contexto que permitirá a cualquier consumidor actualizar el valor.

- Primero añadiremos un método para actualizar el login.

_./src/common/sessionContext.tsx_

```diff
export interface SessionContextProps {
  login: string;
+ updateLogin: (value) => void;
}

export const createDefaultUser = (): SessionContextProps => ({
  login: 'no user',
+ updateLogin: (value) => {},
});
```

- Vamos a configurar esto en el estado del proveedor.

```diff
export class SessionProvider extends React.Component<{}, State> {

  constructor(props) {
    super(props);
-     this.state = createDefaultUser();
+     this.state = {
+        login: createDefaultUser().login,
+        updateLogin: this.setLoginInfo,
+     }
  }

+ setLoginInfo = (newLogin) => {
+   this.setState({login: newLogin});
+ }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}
```

- Es hora de configurar este valor cuando hacemos clic en el botón de inicio de sesión.

- Vamos a añadir un import a nuestra página de inicio de sesión.

_./src/pages/login/loginPage.tsx_

```diff
+ import { SessionContext } from '../../common';
```

- Vamos a actualizar las propiedades del componente login para aceptar el método updateLogin.

_./src/pages/login/loginPage.tsx_

```diff
interface Props extends RouteComponentProps, WithStyles<typeof styles> {
+ updateLogin: (value) => void;
}
```

- Vamos a crear un componente intermedio (en el siguiente ejemplo lo cambiaremos para que sea un HoC genérico).

_./src/pages/login/loginPage.tsx_

```diff
+ export const LoginPageInner2 = (props) =>
+   <SessionContext.Consumer>
+     {
+       ({updateLogin}) =>
+         <LoginPageInner updateLogin={updateLogin} {...props} />
+     }
+   </SessionContext.Consumer>

- export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
+ export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner2)));
```

- Vamos a llamar al método setLogin cuando el usuario pulse el botón.

_./src/pages/login/loginPage.tsx_

```diff
onLogin = () => {
  loginFormValidation.validateForm(this.state.loginInfo)
    .then((formValidatinResult) => {
      if(formValidatinResult.succeeded) {
        if (isValidLogin(this.state.loginInfo)) {
+         this.props.updateLogin(this.state.loginInfo.login);
          this.props.history.push('/pageB');
        } else {
          this.setState({ showLoginFailedMsg: true });
        }
      } else {
        alert('error, review the fields');
      }
    });
}
```

- Si ejecutamos la aplicación podremos veremos el resultado adecuado.

```bash
npm start
```

> Si tenemos que anidar muchos render props, podemos acabar teniendo mucho anidamiento en un componente, en ese caso echa un vistazo a la librería react-composer (https://github.com/jamesplease/react-composer).