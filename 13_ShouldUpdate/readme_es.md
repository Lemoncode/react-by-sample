## 13 ShouldUpdate

En esta muestra mejoraremos el rendimiento con 'shouldComponentUpdate'.

Vamos a implementar un widget de satisfacción de cliente, basado en una cara sonriente, aceptará un rango de valor (0 a 500), y la cara tiene un rango de valores 0..100, 100..200, 200..300, 300..400, 400..500. Nosotros solo dispararemos la opción de renderizado cuando el valor salte dentro del rango anterior o posterior.

Nosotros tomaremos como punto de entrada la muestra _03 State_:

## Pasos resumidos:

- Eliminar los componentes _hello_ and _nameEdit_  (limpiar app).
- Copiar dentro del directorio _content_ los cuatro png que contienen los emoticonos.
- Crear dentro del directorio _content_ un fichero _site.css_ y definir estilos para los emoticonos.
- Crear un componente emoticono.
- Añadir a app un estaddo currenValue, pasando esto a un control mas, añadir un slider para configurarlo.
- Añadamos una optimización... componentshouldupdate.

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o más nuevo) si no están ya instalados.

> Verificar que tienes al menos corriendo la versión de node v6.x.x y npm 3.x.x ejecutando `node -v` y `npm -v` en la terminal de Windows. Versiones más antiguas pueden producir errores.

## Pasos para construirlo 

- Copia el contenido de _03 State_ y ejecútalo:

```
npm install
```

- Hagamos una limpieza en _app.tsx_

_./src/app.tsx_

```jsx
import * as React from 'react';

interface Props {
}

interface State {
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
      </div>
    );
  }
}
```

- Creemos un fichero _src/content_ y copia los cinco emoticones (puedes copiarlo de la implementación en github).

- Vamos a crear un fichero css: _src/content/site.css_ ay añade los estilos a los emoticonos:

_./src/content/site.css_

```css
.very-dissatisfied {
  width:100%;
  height:80px;
  background:url('./one.png') no-repeat;;
}

.somewhat-dissatisfied {
  width:100%;
  height:80px;
  background:url('./two.png') no-repeat;
}

.neither {
  width:100%;
  height:80px;
  background:url('./three.png') no-repeat;
}

.somewhat-satisfied {
  width:100%;
  height:80px;
  background:url('./four.png') no-repeat;
}

.very-satisfied {
  width:100%;
  height:80px;
  background:url('./five.png') no-repeat;
}
```

- Puedes copiar estas imágenes dentro de la carpeta  _content_ la url donde puedes descargartelos: https://github.com/Lemoncode/react-by-sample/tree/master/13%20ShouldUpdate/src/content

- En _webpack.config.js_ añadamos un nuevo fichero _css_ como punto de entrada:

_webpack.config.js_

```diff
entry: [
  './main.tsx',
  '../node_modules/bootstrap/dist/css/bootstrap.css',
+  './content/site.css'
],
```

- Vamos a crear un simple _faceComponent_ bajo _src_, nosotros empezaremos por añadir algunos codificados en el fichero  _src/face.tsx_:

_./src/face.tsx_

```jsx
import * as React from 'react';

export const FaceComponent = (props : {level : number}) => {
  return (
    <div className="somewhat-satisfied"/>
  );
}
```

Vamos ha hacer un rápido test en _app.tsx_

_./src/app.tsx_

```diff
import * as React from 'react';
+ import { FaceComponent } from './face';

interface Props {
}

interface State {
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
+        <FaceComponent level={100}/>
      </div>
    );
  }
}
```

- Hagamos un punto de guardado y ejecutemos la muestra: comprobemos que está funcionando como esperamos.

```
npm start
```

- Ahora es hora de unir la propiedad con la expresión adecuada, vamos a crear un función que de estilo en _face.tsx_

_./src/face.tsx_

```diff
import * as React from 'react';

+ const setSatisfactionClass = (level : number) => {
+  if(level < 100) {
+        return "very-dissatisfied"
+  }
+
+  if(level < 200) {
+        return "somewhat-dissatisfied"
+  }
+
+  if(level < 300) {
+        return "neither"
+  }
+
+  if(level < 400) {
+        return "somewhat-satisfied"
+  }
+
+  return "very-satisfied"
+}

export const FaceComponent = (props : {level : number}) => {
  return (
-    <div className="somewhat-satisfied"/>
+    <div className={setSatisfactionClass(props.level)}/>
  );
}
``` 

- En _app.tsx_ añadamos un estado que mantenga el grado de satisfacción actual más un control deslizante para que el usuario lo actualize.

_./src/app.tsx_

```diff
import * as React from 'react';
import {FaceComponent} from './face'

interface Props {
}

+ interface State {
+  satisfactionLevel : number;
+ }

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

+    this.state = {satisfactionLevel: 300};
  }

  public render() {
    return (
      <div>
+        <input type="range"
+                min="0"
+                max="500"
+                value={this.state.satisfactionLevel}
+                onChange={(event : any) => this.setState(
+								{satisfactionLevel:event.target.value} as State)}
+        />
+        <br/>
+        <span>{this.state.satisfactionLevel}</span>
+        <br/>
-        <FaceComponent level={100}/>
+        <FaceComponent level={this.state.satisfactionLevel}/>
      </div>
    );
  }
}
```

- Vamos a ejecutar la muestra

  ```
  npm start
  ```

	- Añadamos una optimización de renderización, nosotros deberíamos solo lanzar el renderizado cuando el nivel de satisfacción cambie, necesitamos mover el componente a un componente estado:
	
	_./src/face.tsx_

```diff
import * as React from 'react';

+ interface Props {
+   level : number;
+ }

+  const isRangeChange = (oldValue : number, newValue : number) => {
+    const oldValueClass = setSatisfactionClass(oldValue); 
+    const newValueClass = setSatisfactionClass(newValue);
+
+    return oldValueClass !== newValueClass;     
+  }

+ export class FaceComponent extends React.Component<Props, {}> {
- export const FaceComponent = (props: { level: number }) => {

+  shouldComponentUpdate(nextProps : Props, nextState)
+  {
+    return isRangeChange(this.props.level, nextProps.level);
+  }


+  render() {
    return (
-      <div className={this.setSatisfactionClass(props.level)}/>
       <div className={this.setSatisfactionClass(this.props.level)}/>
    );
+  }
}
```

> Hay una manera más fácil de implementar el mismo algoritmo en shouldComponentUpdate.

- Ahora si nosotros colocamos un punto de interrupción en el método de renderizado de faceComponent podemos ver que el renderizado solo se lanza cuando cambias a un rango positivo (ejemplo de 99 a 100).

```
npm start
```