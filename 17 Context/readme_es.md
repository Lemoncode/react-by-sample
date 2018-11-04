# Intro

En esta muestra vamos a aprender como la api de context en React 16 trabaja.

Esto nos permitirá buscar información entre componentes sin tener que ir profundizando traves de las propiedades o tener que añadir la ayuda de redux a nuestro proyecto.

## Pasos para construirlo

- Queremos guardar el campo de _login_ una vez el usuario se logue y muestre la página B (o en culaquier página o componente que lo necesite), vamos a añadir un valor por defecto ('no user').

- Empezaremos por crear un contexto, lo llamaremos _sessionContext_, y añade los tipos apropiados

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

- Esta contexto de sesión expondrá un _provider_ (Nos servirá para establecer el nombre de inicio de sesión en el contexto), y un _consumer_ (Nos permitirá consumir el nombre de inicio de sesión del contexto desde cualquier punto de la aplicación).
Creamos un componente (lo nombraremos _SessionProvider) que en una mano guardará en el estado el nombre del login y lo atará a _SessionContext_ y en la otra acturá como una envoltura (normalmente está al principio de la aplicación y envuelve la aplicación).

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

- Añade esto a un _index_ barrel común.

_./src/common/index.tsx_

```diff
export * from './notification';
+ export * from './sessionContext';
```

- Es momento de exponer este provider al principio de nuestra aplicación.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { PageB } from './pages/b';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
+ import { SessionProvider } from './common'

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

- En la pageB consumiremos el nombre de usuario de sessionContext.

_./src/pages/b/pageB.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
+ import { SessionContext } from '../../common/'

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

- Si ejecutamos la muestra podemos navegar a la página B y ver mostrado el nombre por defecto atado

```bash
npm start
```

- Mostrar un nombre por defecto no es una cosa mala, pero necesitamos mostrar el nombre de login real que ingresado por el usuario, para hacer esto expondremos una función dentro de nuestro contexto que permitirá a cualquier consumer actualizar el valor.

_./src/common/sessionContext.tsx_

```diff
```

- Ahora aplicaremos esto en el loginPage.

Primero añade un métodoo de actualización de login.

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

- Configuraremos esto en el provider del estado.

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

- Momento de configurar este valor cuando hacemos clic en el botón de inicio de sesión.

- Añade un import a nuestro context.

_./src/pages/login/loginPage.tsx_

```diff
+ import { SessionContext } from '../../common';
```

- Actualiza nuestra propiedad del componente login para aceptar el método setLogin.

_./src/pages/login/loginPage.tsx_

```diff
interface Props extends RouteComponentProps, WithStyles<typeof styles> {
+   updateLogin: (value) => void
}
```

- Crearemos un componente intermédio (en nuestra siguiente muestra lo portaremos como un Hoc genérico).

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

- Llamemos al setLogin una vez el usuario pulse.

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

- Si ejecutamos la app podremos verificar que ahora nosotros tenemos el resultado correcto

```bash
npm start
```

> Si tenemos que anidar muchas render props, podemos terminar teniendo un componente anidado pesado, en ese caso revisa la micro librería react-composer (https://github.com/jamesplease/react-composer).