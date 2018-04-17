# 02 Propiedades

En esta demo, presentaremos un concepto básico de React, el manejo de propiedades.

Agregaremos una propiedad _username_ y la mostraremos en el componente _hello_.

Tomaremos la demo **01 Hello React** como punto de partida:

### Pasos resumidos:

- Componente sin estado (stateless) _hello_: crea una propiedad que contendrá el valor de _username_.

- Vamos a informar desde nuestro control padre.

## Requisitos previos

Instalar [Node.js and npm](https://nodejs.org/en/) (v6.6.0) si aún no está instalado en tu equipo.

> Verifique que tiene instalado al menos las versiones de node v6.x.x y npm 3.x.x, ejecutando en una ventana de terminal/consola `node -v` y `npm -v`. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copie el contenido de _01 HelloReact_ y ejecute:

  ```
  npm install
  ```

- Vamos a actualizar _hello.tsx_ con el fin de reflejar la nueva propiedad añadida (_userName_) y mostrarlo mediante interpolación (_{userName}_):

_hello.tsx_

```diff
import * as React from 'react';

- export const HelloComponent = () => {
+ export const HelloComponent = (props: {userName : string}) => {
  return (
-    <h2>Hello component !</h2>
+    <h2>Hello user: {props.userName} !</h2>
  );
}
```

- Actualicemos _main.tsx_ e informemos el valor de la propiedad _userName_:

```diff
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import {HelloComponent} from './hello';

  ReactDOM.render(
-    <HelloComponent/>,
+    <HelloComponent userName="John" />,
    document.getElementById('root')
  );
```

- Probemos la demo:

```cmd
npm start
```
