## Hoc

Vamos a implementar a High Order Component, esto permitirá extraer funcionalidad común y exponerla via composición.

Vamos a tomar como punto de partida el ejemplo _17 Context_:

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

En el ejemplo anterior tuvimos que crear un componente _LoginPageInner2_ intermedio para inyectar al componente los campos _loginInfo_ y _setLoginInfo_ de la sesión de contexto.

Este boilerplate es un poco feo, y sería peor si queremos acceder a esa información desde otras páginas.

Al implementar un Hoc podemos crear una función reusable que facilitará el acceso al consumidor SessionContext.

- Empezaremospor crear nuestro Hoc (vamos a añadir esto a abajo del fichero).

_./src/common/sessionContext.tsx_

```javascript
export const withSessionContext = (Component) => (props) => (
  <SessionContext.Consumer>
    {
      ({ login, updateLogin }) => (
        <Component
          {...props}
          login={login}
          updateLogin={updateLogin}
        />
      )
    }
  </SessionContext.Consumer>
);
```

- Ahora vamosm a importar esto en nuestro loginPage.

_./src/pages/login/loginPage.tsx_

```diff
- import { SessionContext } from '../../common';
+ import { SessionContext, withSessionContext } from '../../common';
```

- Y vamos a borrar LoginPageInner2 y añadir nuestro Hoc:

_./src/pages/login/loginPage.tsx_

```diff
- export const LoginPageInner2 = (props) =>
-  <>
-  <SessionContext.Consumer>
-    {
-      ({updateLogin}) =>
-      <LoginPageInner updateLogin={updateLogin} {...props}/>
-    }
-
-  </SessionContext.Consumer>
-  </>

- export const LoginPage = withStyles(styles)(withRouter<Props>((LoginPageInner2)));
+ export const LoginPage = withSessionContext(withStyles(styles)(withRouter<Props>((LoginPageInner))));
```

- Podemos ejecutar y verificar que el ejemplo está funcionando.

> Como un ejercicio crea una página C y haz uso del Hoc.

> Anidando HOCS podemos hacer código difícil de leer, nosotros podemos usar lodash flow para mitigar esto.