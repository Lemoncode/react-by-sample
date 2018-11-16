## 20 Error Boundaries

En este ejemplo jugaremos con el concepto de barrera de errores.

## Resumen de pasos:

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de _03 State_ y ejecuta `npm install`.

- Vamos a crear un componente defectuoso:

_./src/faultyComponent.tsx_

```jsx
import * as React from 'react';

export class FaultyComponent extends React.Component {
  componentDidMount() {
    throw "I'm the faulty component, generating a bad crash."
  }

  render() {
    return (
      <h2>Hello from Faulty Component</h2>
    )
  }
}
```

- Vamos a instanciar este componente en nuestro _app.tsx_

_./src/app.tsx_

```diff
import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
+ import { FaultyComponent } from './faultyComponent';

interface Props {
}

interface State {
  userName: string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { userName: 'defaultUserName' };
  }

  setUsernameState = (event) => {
    this.setState({ userName: event.target.value });
  }


  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        <FaultyComponent/>
      </>
    );
  }
}
```

- Vamos a ejecutar app

```bash
npm start
```

- Si abres la consola verás que se informa de un fallo grave, eso es algo que no te gustaría sufrir cuando usas plugins y otros componentes en los que no confies, ¿por que no envolver cualquier error en un área segura?y mostrar un componente amigable que no se pudo cargar en caso de que ocurra un error de descontrolador en esa área (y mantener el resto de la aplicación funcionando como se esperaba).

- Vamos a crear una barrera de error.

_./src/erroBoundary.tsx_

```jsx
import * as React from 'React';

export class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Plugin Failed to load, optional error info:</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

- Y envolvamos nuestro faultyComponent dentro de esta barrera de error (podriamos envolver un conjunto de componentes si es necesario).

_./src/app.tsx_

```diff
import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
import { FaultyComponent } from './faultyComponent';
+ import { ErrorBoundary } from './errorBoundary';

interface Props {
}

interface State {
  userName: string;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { userName: 'defaultUserName' };
  }

  setUsernameState = (event) => {
    this.setState({ userName: event.target.value });
  }


  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        <ErrorBoundary>
          <FaultyComponent/>
+         </ErrorBoundary>
      </>
    );
  }
}
```

> Hay un bonito envoltorio genérico para este ErrorBoundary: https://github.com/bvaughn/react-error-boundary

> Barreras de error y manejador de enventos: https://github.com/facebook/react/issues/11409