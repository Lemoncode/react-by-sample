## Intro

Como vemos en el ejemplo _17 Context_ esto es una poderosa característica.

Obtener datos de un _Context.Consumer_ necesita un poco de tubería, hasta ahora hemos utilizado HOC (ejemplo 18) y Render Props (ejemplo 19) para incluir eso en un código reutilizable, eso estuvo bien, pero necesitabas agregar un margen de beneficio adicional a nuestros componentes, hacer un uso intensivo de HOC y RenderProps puede llevarlo a _markup hell_ (muchos accesorios de HOC / Render props).

Veamos como se resuelve esto utilizando Hooks + Use Context.

## Prerequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Vamos a copiar el código del ejemplo _21 Hooks_.

- Vamos a instalar las dependencias.

```bash
npm install
```

- Ahora vamos a desistalar la versión actual de react y react-dom:

```bash
npm uninstall react react-dom --save
```

- E instalamos la versión alfa 16.7:

```bash
npm install react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0 --save
```

- Vamos a reemplazar la solución de render props con un _UseContext_

_./src/pages/pageB.tsx_

```diff
- import * as React from "react"
+ import * as React, {useContext} from "react"
import { Link } from 'react-router-dom';
- import { Session } from '../../common/';
+ import { SessionContext } from '../../common';

// ...

- export const PageB = () =>
+ export const PageB = () => {
+ const loginContext = React.useContext(SessionContext)
+
+ return (

    <div>
-     <Session
-         render={
-           login => (
-             <LoginComponent login={login}></LoginComponent>
-             )}
-     >
+     <LoginComponent login={loginContext.login}></LoginComponent>
  </div>
+}
```

- Asi que ahora nuestro componente _PageB_ se muestra tan simple como:

_./src/pages/pageB.tsx_

```tsx
export const PageB = () => {
  const loginContext = React.useContext(SessionContext);

  return (
    <div>
      <LoginComponent login={loginContext.login}></LoginComponent>
    </div>
  )
}
```

- Ahora podemos eliminar el helper de _renderProps_ que creamos.

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

interface Props {
  render : (login : string) => React.ReactNode;
}

- export class Session extends React.Component<Props> {
-  constructor(props : Props) {
-    super(props);
-  }
-
-  render() {
-    return (
-      <SessionContext.Consumer>
-        {
-          ({ login, updateLogin }) =>
-            <>
-            {this.props.render(login)}
-            </>
-        }
-      </SessionContext.Consumer>
-    )
-  }
- }
```