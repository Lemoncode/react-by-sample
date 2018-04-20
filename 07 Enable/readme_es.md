# 07 Habilitar

Continuemos con el ejemplo de nombre de actualización, esta vez queremos desactivar el
botón "actualizar" cuando la entrada está vacía o cuando el valor no ha cambiado.

Tomaremos una muestra del punto de inicio _06 MoveBacktOStateless_.

Pasos resumidos:

- Agregar una condición para deshabilitar

## Prerrequisitos

Instale [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o más reciente) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copie el contenido de _[./../06 MoveBacktoStateless/](./../06 MoveBacktoStateless /)_.

- Comencemos agregando una condición para deshabilitar el campo siempre que esté vacío. Reemplace solo la etiqueta de entrada en _[./src/nameEdit.tsx](./src/nameEdit.tsx)_ con el siguiente código:

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
    <div>
        <label>Update Name:</label>
        <input value={props.editingUserName}
          onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

-        <button className="btn btn-default" onClick={props.onNameUpdateRequest}>Change</button>
+        <button 
+          className="btn btn-default" 
+          onClick={props.onNameUpdateRequest}
+          disabled={props.editingUserName === ''}
+        >Change</button>
    </div>
```

- Ahora viene la parte difícil, detectar cuando el nombre no ha cambiado. <br/>
Primero agregaremos una nueva propiedad llamada `userName` con el tipo `string` en _[./src/nameEdit.tsx](./src/nameEdit.tsx)_. Este tendrá el último nombre de usuario aceptado.

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
 interface Props {
+    userName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => any;
    onNameUpdateRequest : () => void;
 }
 ```

- Añadiremos a la condición de habilitación una prueba más, verificando si el nombre ha cambiado.
Reemplace nuevamente solo la etiqueta de entrada en _[./src/nameEdit.tsx](./src/nameEdit.tsx)_ con el siguiente código:

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
  <button 
      className="btn btn-default" 
      onClick={props.onNameUpdateRequest}
-      disabled={props.editingUserName === ''}
+      disabled={props.editingUserName === '' || props.userName === props.editingUserName}
      >Change</button>
```

- Ahora tenemos que alimentar esta propiedad desde el control principal (Agregar `userName = {this.state.userName}` al `NameEditComponent` en _[./src/app.tsx](./src/app.tsx)_). El `NameEditComponent` debería ser como:

_[./src/app.tsx](./src/app.tsx)_
```diff
  public render() {
    return (
      <React.Fragment>
        <HelloComponent userName={this.state.userName}/>
        <NameEditComponent
++          userName={this.state.userName}
            editingUserName={this.state.editingUserName}
            onEditingNameUpdated={this.updateEditingName}
            onNameUpdateRequest={this.setUsernameState} />
      </React.Fragment>
    );
  }
```

- Démosle una oportunidad

```
npm start
```

> Como ejercicio, ¿y si queremos hacer esto más genérico? podríamos tener una propiedad genérica llamada enable que podría ser verdadera o falsa.

Para hacer esto, modificaremos [./src/app.tsx](./src/app.tsx) agregando la variable `disable` al componente` <NameEditComponent> `. Esta variable es **booleana**, por lo que necesita condiciones para evaluarla.

_[./src/app.tsx](./src/app.tsx)_
```diff
  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
++        disable={!this.state.userName || this.state.userName === this.state.defaultUserName}
          userName={this.state.userName}
          editingUserName={this.state.editingUserName}
          onEditingNameUpdated={this.updateEditingName}
          onNameUpdateRequest={this.setUsernameState} />
      </>
    );
  }
```

Dentro del componente definimos **props** **disable** como Boolean, junto con sus condiciones que lo evaluarán.

_[./src/nameEdit.tsx](./src/nameEdit.tsx)_
```diff
interface Props {
++  disable: boolean;
    userName : string;
    editingUserName : string;
    onEditingNameUpdated : (newEditingName : string) => void;
    onNameUpdateRequest : () => void;  
}

export const NameEditComponent = (props : Props) =>
  <div>
      <label>Update Name:</label>
      <input value={props.editingUserName}
        onChange={(e) : void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)} />

      <button 
          className="btn btn-default" 
          onClick={props.onNameUpdateRequest}
--        disabled={props.editingUserName === '' || props.userName === props.editingUserName}
++        disabled={props.disable}
        >Change</button>
  </div>
```