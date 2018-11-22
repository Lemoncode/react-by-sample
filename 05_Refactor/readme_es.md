# 05 Refactorizar

En el ejemplo anterior estabamos estableciendo un valor username inicial, ¿que ocurriría si esperásemos que este valor viniera, por ejemplo, de una petición AJAX o si pudiera variar en el tiempo? Lo que ocurriría es que la aproximación actual no funcionaría.

Podríamos pensar en dos posibles soluciones:

- La primera idea que podría venirnos a la mente sería implementar una mezcla: recibimos el valor actual de  name via props, entonces mantenemos un estado con el valor editable actual... ¿Que desventajas nos encontraríamos? Tendríamos que escuchar el getDerivedStateFromProps (componentWillRecieveProps está obsoleto) para cualquier cambio en el control de nombre de usuario del padre y sustituir nuestro estado, acabaríamos con un control compartido.

> Más información sobre getDerivedStateFromProps: https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b

Veamos como quedaría (usando el nuevo método estático getDerivedStateFromProps):

Props e interfaz:

_./src/nameEdit.tsx_

```diff
interface Props {
  initialUserName: string;
  onNameUpdated: (newName: string) => any;
}

interface State {
+  initialUserName : string,
  editingName: string;
}
```
Actualización del constructor:

```diff
  constructor(props: Props) {
    super(props);
    // Comprueba que pasaría si obtenemos este nombre de usuario a través de un callback AJAX
    // encontrarás una implementación diferente en el ejemplo 05
-    this.state = { initialUserName: this.props.initialUserName ,
- editingName: this.props.initialUserName };

+    this.state = { initialUserName: this.props.initialUserName ,
+                   editingName: this.props.initialUserName 
+     };
  }
```
Dentro del componente de clase

```javascript
  static getDerivedStateFromProps(nextProps : Props, prevState : State) : Partial<State> {
    if(nextProps.initialUserName && 
        nextProps.initialUserName != prevState.initialUserName) {
      return {editingName: nextProps.initialUserName}  
    } else {
      return null;
    }
  }
```

- La segunda idea es preparar dos propiedades, el control padre contendrá _userName_ y _editingUsername__. Cuando el usuario hace click en el botón para sustituir el nombre se notifica al control padre y reemplazará el contenido de _userName_ con el contenido de  _editingUsername_. Si _userName_ es actualizado por cualquier otra tercera parte (por ejemplo, un callback AJAX) también se actualizará _editingUsername_.

Tomaremos como punto de partida el ejemplo _04 Callback_:

## Pasos resumidos:

- Actualizar _nameEdit.tsx_ para que solicite el nuevo _editingUsername_, y eliminarlo del estado.
- Actualizar _app.tsx_ para contener la nueva propiedad de edición en el estado, pasarla al hijo, controlar y realizar la actualización apropiada en el evento callback del control hijo.

## Prerequisitos

Instalar [Node.js y npm](https://nodejs.org/es/) si no lo tenemos ya instalado.

> Verificar que estás ejecutando al menos con la versión 6.x.x de node y la versión 3.x.x de npm ejecutando `node -v` y `npm -v` en la ventana de terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copiar el contenido de _04 Callback_ y ejecutar `npm install`.

- Actualizar _nameEdit.tsx_ para que solicite el nuevo _editingUsername_, y eliminarlo del estado.

_nameEdit.tsx_

```diff
import * as React from 'react';

interface Props {
-  initialUserName: string;
-  onNameUpdated: (newName: string) => any;  
+  editingUserName : string;
+  onEditingNameUpdated : (newEditingName : string) => void;
+  onNameUpdateRequest : () => void;  
}

-interface State {
-  editingName: string;
-}
  
-export class NameEditComponent extends React.Component<Props, State> {
+ export class NameEditComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

-    this.state = {editingName: this.props.initialUserName}
  }

-  onChange = (event) => {
-    this.setState({editingName: event.target.value});
-  }

-  onNameSubmit = (event) => {
-    this.props.onNameUpdated(this.state.editingName);
-  }

+  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    this.props.onEditingNameUpdated((e.target as HTMLInputElement).value);
+  }


  public render() {
    return (
      <div>
          <label>Update Name:</label>
-          <input value={this.state.editingName} 
-                 onChange={this.onChange}
-           />
-          <button className="btn btn-default" 
-                   onClick={this.onNameSubmit}
-          >
-             Change
-          </button>
+          <input value={this.props.editingUserName}
+                 onChange={this.onChange} 
+           />
+          <button className="btn btn-default" 
+                  onClick={this.props.onNameUpdateRequest}
+          >
+           Change
+          </button>
      </div>
    )
  }
}
```

- Actualizar _app.tsx_ para contener la nueva propiedad de edición en el estado, pasarla al hijo, controlar y realizar la actualización apropiada en el evento callback del control hijo.

```diff
import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit'

interface Props {

}

interface State {
  userName : string;
+ editingUserName : string;  
}

export class App extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

-    this.state = {userName: 'defaultUserName'};
+      const defaultUserName = 'defaultUserName';
+      this.state = {userName: defaultUserName, editingUserName: defaultUserName};
  }

-  setUsernameState = (newName: string) => {
+  setUsernameState = () => {  
-    this.setState({userName: newName});
+    this.setState({userName: this.state.editingUserName});
  }

+ updateEditingName = (editingName : string) : void => {
+   this.setState({editingUserName: editingName});
+ }

  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName}/>
-        <NameEditComponent 
-           initialUserName={this.state.userName} 
-           onNameUpdated={this.setUsernameState}
-        />
+          <NameEditComponent
+            editingUserName={this.state.editingUserName}
+            onEditingNameUpdated={this.updateEditingName}
+            onNameUpdateRequest={this.setUsernameState} 
+           />
      </>
    );
  }
}
```

Finalmente podemos comprobar que el ejemplo funciona como el _04 Callback_ ejecutando un `npm start` desde la consola de comandos y abriendo [http://localhost:8080](http://localhost:8080).
