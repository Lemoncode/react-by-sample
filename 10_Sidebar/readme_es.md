# 10 Sidebar

En este ejemplo vamos a implementar una única barra lateral.

Tomaremos como punto de partida el ejemplo _03 State_:

## Resumen de pasos:

- Añadir algunos estilos.
- Incluir el nuevo css en webpack.
- Crear un componente de barra lateral.
- Añadir algo de contenido a la barra lateral.
- Añadir un botón para abrir / cerrar la barra lateral.


## Prerequisitos

Instalar [Node.js y npm](https://nodejs.org/es/) (v6.0.0 o más reciente) si no lo tenemos ya instalado en nuestra máquina.

> Verificar que estás ejecutando al menos con la versión 6.x.x de node y la versión 3.x.x de npm ejecutando `node -v` y `npm -v` en la ventana de terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copiar el contenido de _03 State_ y ejecutar `npm install`.

- Crear un fichero llamado _src/sidebar.css_ y añadir los siguientes estilos (http://www.w3schools.com/howto/howto_js_sidenav.asp):

_./src/sidebar.css_

```css
  /* The side navigation menu */
  .sidenav {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1; /* Stay on top */
      top: 0;
      left: 0;
      background-color: #808080; /* Gray*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }


  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
      transition: margin-left .5s;
      padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
  }
```

- Vamos a utilizar CSS Modules, así que configurémoslo.

_./webpack.config.js_

```diff
  module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
-      extensions: ['.js', '.ts', '.tsx']
+      extensions: ['.js', '.ts', '.tsx', '.css']
    },
```

- Solo utilizaremos CSS Modules para la hoja de estilos de la app. No utilizaremos CSS Modules para otros ficheros CSS, como Bootstrap (carpeta node_modules).

_./webpack.config.js_

```diff
  {
    test: /\.css$/,
+    include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
+  // Use CSS modules for custom stylesheets
+  {
+    test: /\.css$/,
+    exclude: /node_modules/,
+    use: [
+        MiniCssExtractPlugin.loader,
+        {
+          loader: 'css-loader',
+          options: {
+            modules: true,
+            localIdentName: '[name]__[local]___[hash:base64:5]',
+            camelCase: true,
+          },
+        },
+      ]
+  },
+  // Do not use CSS modules in node_modules folder

```


- Vamos a crear un nuevo componente sidebar, _src/sidebar.tsx_. En este punto crearemos solamente un rectangulo e interactuaremos con la animación.

_./src/sidebar.tsx_

```jsx
import * as React from 'react';

const classNames = require('./sidebar.css');

export const SidebarComponent = () => 
    <div id="mySidenav" className={classNames.sidenav}>
        <span>Basic side bar, first steps</span>
    </div>
```

- Vamos a añadir un id conocido a la sección body de la página _src/index.html_

_./src/index.html_

```diff
-  <body>
+  <body id="main">
```

- Situemos el componente añadiendolo dentro de `app.tsx`:

_./src/app.tsx_

```diff
  import * as React from 'react';
  import { HelloComponent } from './hello';
  import { NameEditComponent } from './nameEdit';
+  import { SidebarComponent } from './sidebar';
```

_./src/app.tsx_

```diff
  return (
    <>
+      <SidebarComponent/>
      <HelloComponent userName={this.state.userName} />
      <NameEditComponent userName={this.state.userName} 
        onChange={this.setUsernameState.bind(this)} 
      />
    </>
  );
```

- Ahora es el momento de ejecutar la aplicación, simplemente para comprobar que no se ha roto nada (pero no verás ningún resultado).

```
 npm start
```

- Comencemos con la parte interesante de la implementación, añadamos un flag para mostrar/ocultar la barra lateral _sidebar.tsx_.

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

+ interface Props {
+  isVisible: boolean;
+ }

- export const SidebarComponent = () => 
+ export const SidebarComponent = (props: Props) => 
    <div id="mySidenav" className={classNames.sidenav}>
        <span>Basic sidebar, first steps</span>
    </div>
```

- Añadamos algo de lógica para mostrar/ocultar la barra lateral en caso de que se actualice el valor del flag

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible: boolean;
};

+    const divStyle = (props: Props): React.CSSProperties => ({
+      width: (props.isVisible) ? '23rem' : '0rem'
+    });

export const SidebarComponent = (props: Props) => 
-    <div id="mySidenav" className={classNames.sidenav}>
+    <div id="mySidenav" className={classNames.sidenav} 
+       style={divStyle(props)}
+    >
        <span>Basic sidebar, first steps</span>
    </div>
```

- Ahora a nivel de app (en el fichero _app.tsx_) podemos añadir un nuevo miembro al estado (un flag booleano) y un botón para activarlo o desactivarlo.

```diff
  interface State {
    userName : string;
+    isSidebarVisible : boolean;
  }
```

```diff
export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

-    this.state = {userName: 'defaultUserName'};
+     this.state = {
+       userName: "defaultUserName", 
+       isSidebarVisible: false
+     };
  }

  setUsernameState(event) {
    // If the state gets more complex we should use object.assign
    this.setState({userName: event.target.value});
  }

+   toggleSidebarVisibility = () => {
+     const newVisibleState = !this.state.isSidebarVisible;
+
+     this.setState({isSidebarVisible: newVisibleState} as State);
+   }


  public render() {
    return (
      <>
-        <SidebarComponent/>
+        <SidebarComponent isVisible={this.state.isSidebarVisible}/>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent userName={this.state.userName} 
            onChange={this.setUsernameState.bind(this)} 
        />
+       <div style={{float: 'right'}}>
+         <button
+           onClick={this.toggleSidebarVisibility}>
+           Toggle Sidebar
+         </button>
+       </div>
      </>
    );
  }
}
```

- Llegados a este punto necesitaremos parar y volver a arrancar la aplicación para ver los cambios funcionando:

```
npm start
```

- Si ejecutamos nuestro ejemplo, podemos ver como nuestra barra lateral se muestra/oculta.

- Hasta aqui todo bien, pero ¿que pasa si queremos hacer que nuestra barra lateral sea un componente reusable? Podriamos simplemente mostrar nuestra caja pero el contenido debería ser dinámico.

- Comencemos añadiendo algo de contenido cuando nuestra barra lateral es instanciada (_app.tsx_).

_./src/app.tsx_

```diff
-  <SidebarComponent/>
+  <SidebarComponent isVisible={this.state.isSidebarVisible}>
+    <h1>Cool Scfi movies</h1>
+    <ul>
+      <li><a href="https://www.imdb.com/title/tt0816692/">Interstellar</a></li>
+      <li><a href="https://www.imdb.com/title/tt0083658/">Blade Runner</a></li>
+      <li><a href="https://www.imdb.com/title/tt0062622/">2001: a space odyssey</a></li>
+    </ul>  
+  </SidebarComponent>
```

- Ahora vamos a volcar algo de contenido en _sidebar.tsx_ usando {this.props.children}

_./src/sidebar.tsx_

```diff
import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible: boolean;
};

const divStyle = (props: React.CSSProperties) => ({
  width: (props.isVisible) ? '250px' : '0px'
});

- export const SidebarComponent = (props: Props) => 
+ export const SidebarComponent : React.StatelessComponent<Props> = (props) => 

    <div id="mySidenav" className={classNames.sidenav} style={divStyle(props)}>
-       <span>Basic side bar, first steps</span>
+       {props.children}
    </div>
```

> Este código puede mejorarse, ejercicio: intenta extraer el cálculo de width a una función separada (aislada de SidebarComponent).

- Probemos el ejemplo

```
npm start
```
