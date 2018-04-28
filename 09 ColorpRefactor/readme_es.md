# 09 Refactorización del Colorpicker 
En este ejemplo revisaremos el componente colorpicker que creamos previamente, y lo simplificaremos.
Ahora tenemos 3 controles sliders con muchos detalles que hacen nuestro HTML difícil de leer.
Haremos un escenario más orientado al componente.

Tomaremos como punto de partida el ejemplo  _08 Colorpicker_:

Resumen de pasos:

- Crear un componente deslizable para un color simple. 
- Remplazar los slides inputs actuales con el nuevo componente creado.
- Revisar el resultado.


## Prerrequisitos

Instalar [Node.js and npm](https://nodejs.org/en/) (v6.6.0 o posterior) si no están ya instalados.

> Verificar que estás ejecutando al menos la v6.x.x de node y npm 3.x.x ejecutando el siguiente comando `node -v` y `npm -v` en  una terminal/console de window. Versiones viejas pueden producir errores.

## Pasos a seguir:

- Copiar el contenido desde _08 ColorPicker_ y ejecutar `npm install`.

- Definiremos un componente ColorSliderComponent (_colorslider.tsx_).

_./src/colorslider.tsx_

```jsx
import * as React from 'react';
import {Color} from './color';

interface Props {
  value : number;
  onValueUpdated : (newValue : number) => void;
}

export const ColorSliderComponent = (props : Props) => {

  return (
    <div>
      <input type="range"
              min="0"
              max="255"
              value={props.value}
              onChange={(event : any) => props.onValueUpdated(event.target.value)}
      />
      {props.value}
    </div>
  );
}
```

- Refactorizamos nuestro _colorpicker.tsx_.

```diff
import * as React from 'react';
import {Color} from './color';
+ import {ColorSliderComponent} from './colorslider';

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}
  
export const ColorPicker = (props : Props) => {
  return (
    <div>
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.red}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:  props.color.red,
-                  green: event.target.value,
-                  blue: props.color.blue
-                }
-              )}
-      />
-      {props.color.green}
+        <ColorSliderComponent
+          value = {props.color.red}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red: value,
+              green: props.color.green,
+              blue:  props.color.blue
+            })
+          }
+        />
      <br />
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.green}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:  props.color.red,
-                  green: event.target.value,
-                  blue: props.color.blue
-                }
-              )}
-      />
-      {props.color.green}     
+        <ColorSliderComponent
+          value = {props.color.green}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red:  props.color.red,
+              green: value,
+              blue: props.color.blue
+            })
+          }
+        />
       <br />
-      <input type="range"
-              min="0"
-              max="255"
-              value={props.color.blue}
-              onChange={(event : any) => props.onColorUpdated(
-                {
-                  red:   props.color.red,
-                  green: props.color.green,
-                  blue: event.target.value
-                }
-              )}
-      />
-      {props.color.blue}
+        <ColorSliderComponent
+          value = {props.color.blue}
+          onValueUpdated={(value) => props.onColorUpdated(
+            {
+              red:   props.color.red,
+              green: props.color.green,
+              blue: value
+            })
+          }
+        />
      <br />           
    </div>    
  );
}
```

- Probemos y verifiquemos que todo funciona según lo esperado.

  ```
  npm start
  ```
  
- Todavía tenemos mejoras que hacer, porque no tener un solo manejador para todos los colores? Si currificamos el colorupdated handler, podemos!

```diff
import * as React from 'react';
import { Color } from './color'
import {ColorSliderComponent} from './colorslider';

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}

+ const updateColor = (props : Props, colorId : keyof Color) => (value) => {
+    props.onColorUpdated({
+      ...props.color,
+      [colorId]: value
+    });
+ };

export const ColorPicker = (props: Props) => {
  return (
    <div>
      <ColorSliderComponent
      value = {props.color.red}
+      onValueUpdated={updateColor(props, 'red')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red: value,
-          green: props.color.green,
-          blue:  props.color.blue
-        })
-      }
    />
    <br />
    <ColorSliderComponent
      value = {props.color.green}
+      onValueUpdated={updateColor(props, 'green')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red:  props.color.red,
-          green: value,
-          blue: props.color.blue
-        })
-      }
    />
    <br />
    <ColorSliderComponent
      value = {props.color.blue}
+      onValueUpdated={updateColor(props, 'blue')}
-      onValueUpdated={(value) => props.onColorUpdated(
-        {
-          red:   props.color.red,
-          green: props.color.green,
-          blue: value
-        })
-      }
    />
    <br />
    </div>
  );
}
```

- Démosle una oprtunidad el ejemplo: 

```
npm start
```
