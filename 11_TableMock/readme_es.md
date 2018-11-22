# 11 TableMock

Vamos a renderizar una tabla y usar un componente hijo para mostrar cada fila.

Comemzamos por crear algunos datos falsos.

Tomaremos como punto de entrada la muestra _03 State_:

## Resumen de pasos:

- Definimos un modelo de entidad (la llamaremos _member_).
- Definimos una api falsa (para hacerlo simple lo haremos síncrono).
- Crearemos un componente fila, que llamaremos _memberRow_.
- Crearemos un componente tabla, la llamaremos _memberTable_ y hacemos que use  _memberRow.

## Prerequesitos

Instala [Node.js and npm](https://nodejs.org/en/) (v6.6.0) si no lo tienes aún instalado en tu máquina.

> Verificar que estás ejecutando al menos con la versión 6.x.x de node y la versión 3.x.x de npm ejecutando `node -v` y `npm -v` en la ventana de terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contendio de _03 State_ y ejecuta _npm install_.

```cmd
npm install
```

- Definamos una entidad modelo en _src/model/member.ts_:

```javascript
export interface MemberEntity {
  id: number;
  login: string;
  avatar_url: string;
}

export const createEmptyMember = () : MemberEntity => ({
    id: -1,
    login: "",
    avatar_url: ""
});
```

- Vamos a crear algunos datos falsos en _src/api/memberMockData.ts_:

_./src/api/memberMockData.ts_

```javascript
import {MemberEntity} from '../model/member';

var	MembersMockData : MemberEntity[] =
	[
		{
      id: 1457912,
      login: "brauliodiez",
      avatar_url: "https://avatars.githubusercontent.com/u/1457912?v=3"
		},
    {
      id: 4374977,
      login: "Nasdan",
      avatar_url: "https://avatars.githubusercontent.com/u/4374977?v=3"
    }
	];

export default MembersMockData;
```

- Definimos una api falsa (para hacerlo simple vamos a hacerlo síncrono) en _src/api/memberAPI.ts_:

 _src/api/memberAPI.ts_

 ```javascript
import {MemberEntity} from '../model/member';
import MembersMockData from './memberMockData';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  //This would be performed on the server in a real app. Just stubbing in.
  private _clone (item) {
  	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
  };

  // Just return a copy of the mock data
  getAllMembers() : Array<MemberEntity> {
		return this._clone(MembersMockData);
	}
}

export const memberAPI = new MemberAPI();
```

- Ahora es momento de saltar dentro de una parte interesante, vamos a borrar _hello.tsx_ y _nameEdit.tsx_.

- Vamos a crear un componente sin estado que mostrara una simple _memberRow.tsx_ fila.

_src/memberRow.tsx_

```javascript
import * as React from 'react';
import {MemberEntity} from './model/member';

export const MemberRow = (props: {member : MemberEntity}) =>
       <tr>
         <td>
           <img src={props.member.avatar_url} style ={{maxWidth: '10rem'}}/>
         </td>
         <td>
           <span>{props.member.id}</span>
         </td>
         <td>
           <span>{props.member.login}</span>
         </td>
       </tr>
```

> No podemos usar max-widh en el parametro style. Tenemos que escribir 'maxWidth' en los componentes de react.

- Luego vamos a implementar un componente que mostrará una lista de miembros (y usaremos las filas), _membersTable.tsx_:

_./src/membersTable.tsx_

```javascript
import * as React from 'react';
import {MemberEntity} from './model/member';
import {memberAPI} from './api/memberAPI';
import {MemberRow} from './memberRow';

interface Props {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  members : MemberEntity[]
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export class MembersTableComponent extends React.Component<Props, State> {

  constructor(props : Props){
        super(props);
        // set initial state
        this.state = {members: []};
  }

   // Standard react lifecycle function:
   // https://facebook.github.io/react/docs/component-specs.html
   public componentDidMount() {
     this.setState({members: memberAPI.getAllMembers()})
   }

   public render() {

       return (
        <div className="row">
          <h2> Members Page</h2>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Avatar
                </th>
                <th>
                  Id
                </th>
                <th>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.members.map((member : MemberEntity) =>
                  <MemberRow key={member.id} member = {member}/>
                )
              }
            </tbody>
          </table>
        </div>
       );
  }
}
```

- Vamos a actualizar app.tsx

```diff
import * as React from 'react';
- import { HelloComponent } from './hello';
- import { NameEditComponent } from './nameEdit';
+ import {MembersTableComponent} from './membersTable';

interface State {
  userName : string;
}

export class App extends React.Component<{}, State> {
  public render() {
      return (
       <>
+        <MembersTableComponent/>
-        <HelloComponent 
-					userName={this.state.userName} 
-				/>
-        <NameEditComponent 
-					userName={this.state.userName} 
-					onChange={this.setUsernameState} 
-				/>

       </>
      );
 }
}

```

Ejecutemos la muestra

```
npm start
```
