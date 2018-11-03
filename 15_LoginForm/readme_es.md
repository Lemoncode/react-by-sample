## 15 Login form

En esta muestra vamos a implementar una página básica de login, que redireccionará al usuario a otra página cuando el login sea correcto.

Intentaremos de crear un [realistic layout](http://bootsnipp.com/snippets/featured/compact-login-form-bs-3), para hacerlo simple vamos a romper esto en subcomponentes y hacer algunas refactorizaciones para hacer la solución más mantenible.

Tomaremos como punto de partida la muestra _14 ReactRouter_:

## Resumen de pasos:

- Renombrar pageA a LoginPage.
- Crear una subcarpeta 'Pages' y reorganizar las páginas.
- Construir el layout para esta página.
- Añadir navegación en el botón de login.
- Añadir validación de login en la api falsa.
- Conectarlo dentro de la lógica del botón de login.
- Hacer una pequeña refactorización y limpiar funcionalidades extras a un componente reusable.
- Añadir algunas validaciones de formulario (campos obligatorios, longitud mínima).

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x and npm 3.x.x usando los comandos `node -v` y `npm -v` en un terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de _14 React Router_ y ejecuta _npm install_.

- Renombra _pageA.tsx_ a _loginPage.tsx_.

- Actualiza también el nombre del componente.

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

- Ahora es momento de reorganizar la estuctura de las páginas. Crea una subcarpeta llamada _pages_

- Bajo ese subcarpeta crea dos subcarpetas: _pages/login/loginPage.tsx_ y _pages/b/pageB.

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

- En algunos casos estas páginas contienen más ficheros secundarios, crea un fichero _index.tsx_ simple por cada una de estas páginas.

- Bajo _pages/login/index.ts.

```javascript
export {LoginPage} from './loginPage';
```

- Bajo _pages/b/index.ts_

_./src/pages/b/index.ts_

```javascript
export {PageB} from './pageB';
```

- La estrutura queda tal que así:

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

- Vamos a actualizar _main.tsx_ (rutas, nombes y añade una redirección de root a la página login).

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import { PageA } from './pageA';
- import { PageB } from './pageB';
+ import { LoginPage } from './pages/login';
+ import { PageB } from './pages/b';

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

- Actualiza también la navegación de _pageB_ a _loginPage_, _pageB.tsx_.

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
+      <Link to="/">Navigate to Login</Link>
    </div>
  )
}
```

- Haz un test rápido y verifica que todo aún funciona bien.

```
npm start
```

- Momento de borrar el fichero 'Sample app' del fichero principal _html_.

```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div class="well">
-      <h1>Sample app</h1>
      <div id="root"></div>
    </div>
  </body>
</html>
```

- Vamos a crear un adecuado _login_ layout, _loginPage.tsx_, basada en [following layout](http://bootsnipp.com/snippets/featured/compact-login-form-bs-3) pero romperemos esto en subcomponentes.

- Construyamos a bonito layout, instalaremos _@material-ui/core_

```bash
npm install @material-ui/core @material-ui/icons --save-dev
```

- Ahora podremos crear un formulario de login podría ser algo como esto:

_./src/pages/loginPage.tsx_

```javascript
import * as React from "react"
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

const LoginPageInner = (props : Props) => {
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

export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

- Esto puede estár ok, pero si analizamos este componente más a fondo, prodíamos dividirlo en dos, una es la tarjeta en sí, la otra el cuadro del diálogo, por lo que finalmente dibería verse como

** Propósito ** 

```javascript
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
```

- Creamos el loginformcomponent:

_./src/pages/login/loginForm.tsx_

```javascript
import * as React from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const LoginForm = (props) => {
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

- Y actualizamos _loginPage.tsx_

_./src/pages/loginPage.tsx_

```diff
import * as React from "react"
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";
+ import { LoginForm } from './loginForm';

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

const LoginPageInner = (props : Props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
+        <LoginForm/>
-        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
-          <TextField
-            label="Name"
-            margin="normal"
-          />
-          <TextField
-            label="Password"
-            type="password"
-            margin="normal"
-          />
-          <Button variant="contained" color="primary">
-            Login
-          </Button>
-        </div>
      </CardContent>
    </Card>
  )
}

export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

- Vamos a intentar y verificar como se está viendo.

```bash
npm start
```

- Añadamos una navegación en el botón, hagámoslo en dos pasos.

- Primero exponemos un método para hacer esto en loginPage.

_./src/pages/login/loginPage.tsx_

```diff
// ...

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

const LoginPageInner = (props) => {
  const { classes } = props;

+   const onLogin = () => {
+      props.history.push('/pageB');  
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
+ export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

- Añadamos la navegación en el botón (mas tarde verificaremos el usuario y la contraseña) _form.tsx_.
En order de hacer esto usaremos react-router 4 "withRouter" HoC
(High order component).

_./src/pages/login/form.tsx_

```diff
import * as React from "react"

interface Props {
+  onLogin : () => void;
}

+export const LoginForm = (props : Props) => {
- export const LoginForm = () => {  
+   const { onLogin } = this.props;
  
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
-          <Button variant="contained" color="primary">
+          <Button variant="contained" color="primary" onClick={onLogin}>
            Login
          </Button>
        </fieldset>
      </form>
    </div>
  );
- }
+})
```

- Demos un vistazo rápido.

```bash
npm start
```

Ok, podemos navegar cuando nosotros clicamos en la página de login.

- Guardemos el progreso, ahora es momento de recoger la información username y password, y verificaremos si es válida la contraseña.

- Definamos una entidad para loginInfo crearemos la seguiente ruta y el fichero

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

- Añadamos a la restApi falsa y añadamos la validación de login: crearemos una carpeta _src/api_. y un fichero llamado _login.ts_

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

- Añadamos una integración a _api_, más una navegación en el existo de login.

- Primero crearemos un estado de login y añade la integración de la api.

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

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});

+ interface State {
+   loginInfo: LoginEntity;
+ }

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

- const LoginPageInner = (props) => {
+   class LoginPageInner extends React.Component<Props, State> {
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
+   const { classes } = this.props;

  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
-        <LoginForm onLogin={onLogin} />      
+        <LoginForm onLogin={this.onLogin} />
      </CardContent>
    </Card>
  )
+  }
}

export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

- Ahora leamos un dato del componente textfields (usuario y contraseña).

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
+            loginInfo={this.state.loginInfo}
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
+  onUpdateField: (string, any) => void;
+  loginInfo : LoginEntity;
}

export const LoginForm = (props : Props) => {
-  const { onLogin } = props;
+  const { onLogin, onUpdateField, loginInfo } = props;

+  // TODO: Enhacement move this outside the stateless component discuss why is a good idea
+  const onTexFieldChange = (fieldId) => (e) => {
+    onUpdateField(fieldId, e.target.value);
+  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <TextField
        label="Name"
        margin="normal"
+        value={loginInfo.login}
+        onChange={onTexFieldChange('login')}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
+        value={loginInfo.password}
+        onChange={onTexFieldChange('password')}
      />
      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}
```

- Mostremos una notificación cuando la validación de login falle.

- Primero crearemos un componente de notificación simple, basado en _react material ui_ _snackbar_

_./src/common/notification.tsx_

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

- Vamos a exponer este componente común via un fichero _index_.

_./src/common/index.tsx_

```javascript
export * from './notification';
```

- Ahora lo instanciamos en nuestro _loginPage_

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
-    }
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
+      <>
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
+      </>
    )

  }
}

export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner)));
```

- Estamos recibiendo algunas advertencias debido a la nueva versión de la tipografía, agreguemos un tema para solucionarlo.

Cuidado con la nueva tipografía y la snackbar:
https://github.com/mui-org/material-ui/issues/13144

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
+ import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {LoginPage} from './pages/login';
import {PageB} from './pages/b';

+ const theme = createMuiTheme({
+  typography: {
+    useNextVariants: true,
+  },
+ });


ReactDOM.render(
+  <MuiThemeProvider theme={theme}>
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={LoginPage} />
        <Route path="/pageB" component={PageB} />
      </Switch>
    </HashRouter>
+    </MuiThemeProvider>
  ,document.getElementById('root')
);
```

- Estamos recibiendo algunas advertencias en la snackbar, pu puedes arreglarlo aquí:

https://github.com/mui-org/material-ui/issues/13144

https://codesandbox.io/s/zz6wnqklzm

> ¿ Y la validación del formulario ? Hay muchas librerías disponibles, una que nosotros hemos creado en lemoncode es lc-form-validation crearemos una muestra incluyendo esta librería (campos requeridos)