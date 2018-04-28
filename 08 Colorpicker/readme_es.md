# 08 Colorpicker

Tomaremos como punto de partida el ejemplo _01 HelloReact_:

>Este ejemplo está basado en el siguiente: [egghead jsbin](https://jsbin.com/qiwoxax/4/edit?html,js,output), pero añade algunas variaciones

Resumen de pasos:

- Renombrar el archivo _hello.tsx_  a  _colorpicker.tsx_.
- Definir las propiedades y el estado.
- Crear la UI.


## Prerrequisitos

Instalar [Node.js and npm](https://nodejs.org/en/) (v6.6.0 ó + nueva) si aún no están instaladas.

> Verificar que tienes node al menos v6.x.x y npm 3.x.x ejecutando `node -v` y `npm -v` en un terminal ó console de windows. Versiones viejas pueden provocar errores.

## Pasos a seguir.

- Copiar el contenido de _01 HelloReact_ y ejecutar `npm install`.

- Vamos a definir una estructura apropiada (crea un archivo _color.tsx_).

_./src/color.tsx_

```javascript
export interface Color {
  red : number;
  green : number;
  blue : number;
}
```

- Renombramos _hello.tsx_ a _colorpicker.tsx_.

- Renombramos también el nombre del componente.

```jsx
import * as React from 'react';

export const ColorPicker = () => {
  return (
    <h2>Hello component !</h2>
  );
}
```

- Creamos un archivo intermedio _app.tsx_ como hicimos en ejemplos previos:

_./src/app.tsx_

```jsx
import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';

interface State {
  color : Color;
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState = (newColor : Color) => {
    this.setState({color: newColor});
  }

  public render() {
    return (
      <div>
        <ColorPicker/>
      </div>
    );
  }
}
```

- Necesitamos actualizar _main.tsx_ para indicar los cambios

_./src/main.tsx_

```diff
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
-  import { HelloComponent } from './hello';
+  import {App} from './app';

  ReactDOM.render(
-   <HelloComponent/>  
+   <App/>,
    document.getElementById('root'));
```

- Vamos a cambiar también el contenido del fichero, definimos un color y un
  callback como propiedad para establecer el color (_colorpicker.tsx_).

_./src/colorpicker.tsx_

```diff
import * as React from 'react';
+ import {Color} from './color'

+ interface Props {
+  color : Color;
+  onColorUpdated : (color : Color) => void;
+ }

export const ColorPicker = () => {
  return (
    <h2>Hello component !</h2>
  );
}
```

- Vamos a comenzar solo definiendo un control para el componente rojo de un color dado. (_colorpicker.tsx_).

_./src/colorpicker.tsx_

```diff
-  export const ColorPicker = () => {
+  export const ColorPicker = (props : Props) => {
    return (
-      <h2>Hello component !</h2>
+      <div>
+        <input type="range"
+               min="0"
+               max="255"
+               value={props.color.red}
+               onChange={(event : any) => props.onColorUpdated(
+                 {red: event.target.value, green: props.color.green, blue: props.color.blue}
+               )}
+        />
+        {props.color.red}
+      </div>
    );
  }
```

- Ahora actualizamos el archivo _app.tsx_ para interactuar con las propiedades del componente.

_./src/app.tsx_

```diff
  import * as React from 'react';
  import {Color} from './color';
  import {ColorPicker} from './colorpicker';

  interface State {
    color : Color;
  }

  export class App extends React.Component<{}, State> {
    constructor(props) {
      super(props);

      this.state = {color: {red: 90, green: 50, blue: 70}};
    }

    setColorState(newColor : Color) {
      this.setState({color: newColor});
    }

    public render() {
      return (
        <div>
+          <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
-          <ColorPicker/>
+          <ColorPicker color={this.state.color}  onColorUpdated={this.setColorState}/>
        </div>
      );
    }
  }

```

- Ahora probamos que tenemos el funcionamiento básico correcto.

```
  npm start
```

- Completamos el componente añadiendo sliders para las opciones de color verde y azul:

> Nota: esto parecerá un poco feo, en el siguiente ejemplo vamos a refactorizar y lo haremos una solución más limpia.

_./src/colopicker.tsx_

```diff
  export const ColorPicker = (props : Props) => {
    return (
      <div>
        <input type="range"
               min="0"
               max="255"
               value={props.color.red}
               onChange={(event : any) => props.onColorUpdated(
                 {
                   red: event.target.value,
                   green: props.color.green,
                   blue:  props.color.blue
                 }
               )}
        />
        {props.color.red}
+        <br />
+        <input type="range"
+               min="0"
+               max="255"
+               value={props.color.green}
+               onChange={(event : any) => props.onColorUpdated(
+                 {
+                   red:  props.color.red,
+                   green: event.target.value,
+                   blue: props.color.blue
+                 }
+               )}
+        />
+        {props.color.green}
+        <br />
+        <input type="range"
+               min="0"
+               max="255"
+               value={props.color.blue}
+               onChange={(event : any) => props.onColorUpdated(
+                 {
+                   red:   props.color.red,
+                   green: props.color.green,
+                   blue: event.target.value
+                 }
+               )}
+        />
+        {props.color.blue}
+        <br />
      </div>
    );
  }
```

- Haremos esto un poco más atractivo visualmente, sería una buena idea mostrar un rectángulo relleno con el color selccionado. Crearemos un componente ColorDisplayer (_colordisplayer.tsx_).

_./src/colordisplayer.tsx_

```jsx
  import * as React from 'react';
  import {Color} from './color'

  interface Props {
    color : Color;
  }

  export const ColorDisplayer = (props : Props) => {
    const divStyle = {
      width: '11rem',
      height: '7rem',
      backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`
    };

    return (
      <div style={divStyle}>
      </div>
    );
  }
```

- Ahora vamos a usarlo dentro de nuestro componente App (_app.tsx_).

```diff
import * as React from 'react';
import {Color} from './color';
import {ColorPicker} from './colorpicker';
+  import {ColorDisplayer} from './colordisplayer';

interface State {
  color : Color;
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState(newColor : Color) {
    this.setState({color: newColor});
  }

  public render() {
    return (
      <div>
+        <ColorDisplayer color={this.state.color} />      
+        <span>Color: [red: {this.state.color.red}, green: {this.state.color.green}, blue: {this.state.color.blue}]</span>
        <ColorPicker color={this.state.color}  onColorUpdated={this.setColorState.bind(this)}/>
      </div>
    );
  }
}
```

- Ahora a probarlo y ver los resultados!!!

 ```
npm start
```
