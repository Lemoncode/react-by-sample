# 04 Callback + State

En este ejemplo vamos a refactorizar el ejemplo **03 state**.

Actualizaremos la propiedad del nombre solo cuando el usuario haga click en el botón _change_ , simplificaremos el evento también.

Obviamente, partiremos del ejemplo **03 State** como punto de partida.

## Pasos resumidos:

- Añadir un botón al componente `EditName` y un controlador para éste.
- Enviar solo el nombre cuando el usuario haga click en el botón.
- Actualizar el componente `app` para manejar el nuevo evento simplificado.

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0) si no lo tenemos ya instalado.

> Verificar que estás corriendo al menos con la versión de node 6.x.x y npm 3.x.x con `node -v` y `npm -v` en la terminal/consola. Versiones más antiguas pueden producir errores.

## Pasos para construirlo

- Copiar el contenido de la carpeta `03 State` en una carpeta vacía de ejemplo y hacer ésta tu carpeta actual.

- Instalar los paquetes npm descritos en el `package.json` y verificar que funciona:

```bash
npm install
```

- Como vamos a utilizar un controlador interno, vamos a transformar `NameEditComponent` de un componente sin estado a un componente de clase, luego añadiremos algún refactor en el nombre.

El fichero `nameEdit.tsx` debería parecerse a:

_nameEdit.tsx_

```diff
import * as React from 'react';
import { Fragment } from 'react';


interface Props {
-  userName : string;
-  onChange : (event) => void;
+  initialUserName: string;
+  onNameUpdated: (newName: string) => any;
}

+ interface State {
+  editingName: string;
+ }


- export const NameEditComponent = (props : Props) => {
-  return (
-    <>
-      <label>Update name:</label>
-      <input value={props.userName} 
-            onChange={props.onChange}
-       />
-    </>
-  );
-}

+ export class NameEditComponent extends React.Component<Props, State> {
+ 
+   constructor(props: Props) {
+     super(props);
+     // Watch out what would happen if we get this user name via an AJAX callback
+     // you will find a different implementatin on 05 sample
+     this.state = {editingName: this.props.initialUserName};
+   }
+
+ onChange = (event) => {
+   this.setState({editingName: event.target.value});
+ }
+
+ onNameSubmit = (event: any): any => {
+   this.props.onNameUpdated(this.state.editingName);
+ }
+
+  public render() {
+    return (
+      <>
+        <label>Update Name:</label>
+        <input value={this.state.editingName} 
+               onChange={this.onChange} 
+         />
+        <button className="btn btn-default" 
+               onClick={this.onNameSubmit} 
+        >
+           Change
+         <button>
+      </>
+    );
+  }
+ }
```

- Vamos a conectar esto en el fichero `app.tsx`

_./src/app.tsx_

```diff
export class App extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {userName: 'defaultUserName'};
  }

-  setUsernameState = (event) => {
-    this.setState({userName : event.target.value})
-  }

+  setUsernameState = (newName: string) => {
+    this.setState({userName: newName});
+  }

  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName}/>
-        <NameEditComponent 
-           userName={this.state.userName} 
-           onChange={this.setUsernameState}
-        />
+        <NameEditComponent 
+           initialUserName={this.state.userName} 
+           onNameUpdated={this.setUsernameState}
+         />
      </>
    );
  }
}
```

Ahora vamos a limpiar el evento, fuertemente tipado y simplificado
(ya que es más sencillo).

- Vamos a intentarlo:

  ```bash
  npm start
  ```

- Luego cargamos http://localhost:8080/ en el navegador y veremos el resultado.

Ahora, el saludo solo cambia cuando el usuario hace click en el botón de cambiar.

> ¿ Qué ocurre si simulamos una llamada AJAX ?, vamos a colocar en la aplicación en componentWillMount un timeout y establecemos el valor del nombre.
