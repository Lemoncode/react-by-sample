# 01 Hello React

En este ejemplo, crearemos nuestro primer componente de react y lo conectaremos con el
DOM a través de react-dom.

Tomaremos una muestra de punto de inicio _00 Boilerplate_.

Resumen de los pasos:

- Instalar librerías de react y react-dom.
- Instalar react y react-dom typescript definitions.
- Actualizar el index.html para crear un marcador de posición para los componentes de react.
- Crea un componente de react simple.
- Conectar este componente usando react-dom.

## Requisitos previos

Instalar [Node.js y npm](https://nodejs.org/en/) (v8.6.0 o más reciente) si aún no está instalando en tu máquina.

> Verifica que esté ejecutando al menos node v8.x.x y npm 5.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de la carpeta `00 Boilerplate` a una carpeta vacía para este ejemplo.

- Instale los paquetes npm descritos en [./package.json](./package.json) y verifica que funcionan:

```bash
npm install
```

- Instalar las librerías `react` y `react-dom` como dependencias del proyecto.

```bash
npm install react react-dom --save
```

- Instalar también las definiciones de Typescript para `react` y` react-dom` pero como dependencias de desarrollo

```bash
npm install @types/react @types/react-dom --save-dev
```

- Actualiza el [./src/index.html](./src/index.html) para crear un marcador de posición para el componente de react.

_[./src/index.html](./src/index.html)_
```diff
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h1>Sample app</h1>
+     <div id="root"></div>
    </body>
  </html>
```

- Crea un componente de react simple (vamos a crearlo dentro de un nuevo archivo llamado [./src/hello.tsx](./src/hello.tsx)].
```jsx
import * as React from 'react';

export const HelloComponent = () => {
  return (
    <h2>Hello component !</h2>
  );
}
```

- Conecta este componente usando `react-dom` bajo [./src/main.tsx](./src/main.tsx) (tenemos que cambiar el nombre de esta extensión de archivo de `ts` a `tsx` y reemplazar el contenido).

_[./src/main.tsx](./src/main.tsx)_
```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './hello';

ReactDOM.render(
  <HelloComponent/>,
  document.getElementById('root')
);
 ```

- Modifica el archivo [./webpack.config.js](./webpack.config.js) y cambia el punto de entrada de [./src/main.ts](./src/main.tsx) a [./src/main.tsx](./src/main.tsx).

_[./webpack.config.js](./webpack.config.js)_
```diff
  ...
  entry: [
-    './main.ts',
+    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css'
  ],
  ...
```

- Ejecuta el ejemplo:

```bash
npm start
```

- Luego, carga [http://localhost:8080/](http://localhost:8080/) en un navegador para ver el resultado.