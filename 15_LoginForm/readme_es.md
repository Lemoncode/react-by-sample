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

