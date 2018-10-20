# 03 Estado

En este ejemplo vamos a introducir un concepto básico de React: manejando estados.

En este escenario nosotros proveeremos un username por defecto y luego lo actualizaremos.

Tomaremos como punto de entrada el ejemplo _02 Properties_:

## Pasos resumidos:

- Crear un componente _App_ que contendrá el estado. Este estado contendrá el username actual (con valor por defecto "defaultUserName").
Este componente _App_ renderizará el component _Hello_. Primero nosotros crearemos un _App_ componente simple sin estado.
- Actualizar el fichero _main.tsx_ para incluir nuestro componente _App_.
- Cambiar el componente _App_ a un componente clase con estado donde contendremos el estado _userName_.
- Crear un componente _NameEdit_ para cambiar el username. Esto cambiara el estado de _App_ usando una función de _App_.
- Verificar que todo funciona correctamente.

## Requisitos previos

Instala [Node.js y npm](https://nodejs.org)
si no lo tenías aún instalado en tu maquina.

> Verifica que tienes instalado al menos las versiones de node v6.x.x y npm 3.x.x, ejecutando en una ventana de terminal/consola `node -v` y `npm -v`. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de _02 Properties_ y ejecuta `npm install`.

- Vamos a crear un componente _App_ bajo un fichero llamado _app.tsx_ (este componente mostrará el componente _Hello_).

_./src/app.tsx_

```jsx
import * as React from 'react';
import { HelloComponent } from './hello';

export const App = () => {
  return (
    <HelloComponent userName="John" />
  );
}
```

- Vamos a actualizar _main.tsx_ para usar el componente _App_ que acabamos de crear.

_./src/main.tsx_

```diff
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
+ import { App } from './app';

- import { HelloComponent } from './hello';

  ReactDOM.render(
-    <HelloComponent userName="John" />,
+    <App />,
    document.getElementById('root')
  );
```

- Ahora podemos verificar que sigue funcionando como esperamos.

  ```
  npm start
  ```

	Es hora de revisitar _app.tsx_. Nosotros queremos guardar el nombre del usuario y luego actualizarlo. Vamos a mover esta clase componente con estado y define un estado incluyendo _userName_, y pasamos este valor al componente _Hello_.

	_./src/app.tsx_

```jsx
import * as React from 'react';
import {HelloComponent} from './hello';

interface Props {
}

interface State {
  userName : string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {userName: 'defaultUserName'};
  }

  public render() {
    return (
      <HelloComponent userName={this.state.userName} />
    );
  }
}
```

- De nuevo, podemos comprobar que todo funciona correctamente tal y como esperamos.

  ```
  npm start
  ```

	- Es hora de crear un componente _NameEdit_. Este componente permitirá al usuario actualizar su username y notificar con un callback al control del padre cuando el valor de _userName_ actualize.

	_./src/nameEdit.tsx_

```jsx
import * as React from 'react';

interface Props {
  userName : string;
  onChange : (event) => void;
}

export const NameEditComponent = (props : Props) => 
    <>
      <label>Update name:</label>
			<input value={props.userName}
						 onChange={props.onChange}
			/>
    </>
```

Nota aclaratoria: ¿ Que es este framento <> ? Una manera de crear un componente que tiene múltiples elementos (no un único padre). Disponible desde React 16.2. Como una manera alternativa puedes escribir:

```jsx
  ...
  export const NameEditComponent = (props : Props) => 
    <React.Fragment>
      <label>Update name:</label>
			<input value={props.userName} 
						 onChange={props.onChange}
			/>
    </React.Fragment>
}
```

- En el fichero _app.tsx_, vamos a añadir una función para remplazar el valor del estado de _userName_ con el valor nuevo.

```diff
  import * as React from 'react';
  import {HelloComponent} from './hello';
+ import { NameEditComponent } from './nameEdit';

  interface Props {
  }

  interface State {
    userName : string;
  }

  export class App extends React.Component<Props, State> {
    constructor(props : Props) {
      super(props);

      this.state = {userName: 'defaultUserName'};
    }

+    setUsernameState = (event) => {
+      this.setState({userName: event.target.value});
+    }

    public render() {
      return (
+        <>
          <HelloComponent userName={this.state.userName} />
+          <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        </>
      );
    }
  }
```

Nota aclarativa: la intención de usar la función flecha. Esto evita perder el contexto de _this_ en el callback.

Nota aclarativa 2: Este this.setState() cambiará el valor del estado en algún punto en el futuro. No consideres que esto es un cambio asíncrono - no lo es. La lógica de escritura que depende de que el nuevo valor del nombre de usuario esté en el estado justo después de llamar a this.setState() es incorrecta y puede fallar. Si necesitas escribir código dependiendo de que el  nuevo valor esté en el estado, usa un callback como segundo parámetro de this.setState(). Mira este ejemplo

```
  setUserNameState = (newName: string) => {
    this.setState({userName: newName}, this.nameChanged);
  }
  
  nameChanged() {
    /* logic here gets invoked after the new name value in the state is set. */
  }
```

- Finalmente vamos a comprobar que todo funciona una vez más. 

  ```
  npm start
  ```