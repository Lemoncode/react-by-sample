# 14 ReactRouter

En este ejemplo comenzaremos a usar React-Router (navegación <acronym title="Single Page Application">SPA</acronym>).

En este caso proporcionaremos un `userName` por defecto pero dejaremos actualizarlo al usuario.

Tomaremos como punto de partida el ejemplo _[03 State](./../03%20State)_

## Resumen de pasos:

- Primero vamos a hacer un poco de limpieza: eliminamos _hello.tsx_ y _nameEdit.tsx_
- Vamos a crear dos componentes: _[PageA.tsx](./src/pageA.tsx)_ y _[PageB.tsx](./src/pageB.tsx)_
- Vamos a instalar las dependencias a _react-router-dom_ y sus definiciones para typescript.
- Vamos a definir el enrutado.
- Vamos a definir la navegación de _[PageA.tsx](./src/pageA.tsx)_ a _[PageB.tsx](./src/pageB.tsx)_
- Vamos a definir la navegación de _[PageB.tsx](./src/pageB.tsx)_ a _[PageA.tsx](./src/pageA.tsx)_

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en un terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

Copia el contenido de _[03 State](./../03%20State)_ y ejecuta:

  ```
  npm install
  ```

- Vamos a hacer algo de limpieza (eliminar los archivos _src/hello.tsx_ y _src/nameEdit.tsx_).

- Vamos a crear un componente llamado _PageA_ como _src/pageA.tsx_:

## ./src/pageA.tsx

```jsx
import * as React from "react"

export const PageA = () =>
    <div>
      <h2>Hello from page A</h2>
    </div>
```

- Vamos a crear un componente llamado _PageB_ como _src/pageB.tsx_:

### ./src/pageB.tsx

```jsx
import * as React from "react"

export const PageB = () =>
    <div>
      <h2>Hello from page B</h2>
    </div>
```

- Vamos a instalar las dependencias [`react-router-dom`](https://github.com/ReactTraining/react-router) y sus definiciones para typescript.

```bash
npm install react-router-dom --save
npm install @types/react-router-dom --save-dev  
```

- Vamos a definir el enrutado en _main.tsx_:

## ./src/main.tsx

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import { App } from './app';
- import { HelloComponent } from './hello';
+ import { HashRouter, Switch, Route } from 'react-router-dom';
+ import { PageA } from './pageA';
+ import { PageB } from './pageB';

ReactDOM.render(
- <App />
+ <HashRouter>
+   <Switch>
+     <Route exact={true} path="/" component={PageA} />
+     <Route path="/pageB" component={PageB} />
+   </Switch>
+ </HashRouter>,
document.getElementById('root')
);
```

- Es hora de verificar que estamos siguiendo el camino correcto:

```bash
npm start
```

- Vamos a definir la navegación de _[PageA.tsx](./src/pageA.tsx)_ a _[PageB.tsx](./src/pageB.tsx)_.

## ./src/pageA.tsx

```diff
import * as React from "react"
+ import { Link } from 'react-router-dom';

export const PageA = () =>
    <div>
      <h2>Hello from page A</h2>
+     <br />
+     <Link to="/pageB">Navigate to Page B</Link>
    </div>
```

- Vamos a definir la navegación de _[PageB.tsx](./src/pageB.tsx)_ a _[PageA.tsx](./src/pageA.tsx)_

## ./src/pageB.tsx

```diff
import * as React from "react"
+ import { Link } from 'react-router-dom';

export const PageB = () =>
    <div>
      <h2>Hello from page B</h2>
+     <br />
+     <Link to="/">Navigate to Page A</Link>
    </div>
```

- Ejecutamos la aplicación y comprobamos que la navegación funciona correctamente.

```bash
npm start
```