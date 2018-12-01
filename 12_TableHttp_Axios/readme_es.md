# 12 Table Http con Axios

Sigamos con nuestro ejemplo de la tabla, vamos a cambiar datos falsos por unos reales y realizaremos las llamadas con la librería Axios.

Cogeremos como punto inicial el ejemplo _11 TableMock_:

## Pasos resumidos:

- Configurar transpilación y añadir una transpilación extra babel >> es5.
- Actualizar la API para trabajar con [Axios](https://github.com/axios/axios) y obtener datos de la API de Github.
- Actualizar _tableComponent_ para mostrar los datos.

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o más nuevo) si no están ya instalados.

> Verificar que tienes al menos corriendo la versión de node v6.x.x y npm 3.x.x ejecutando `node -v` y `npm -v` en la terminal de Windows. Versiones más antiguas pueden producir errores.

## Pasos para construirlo

- Copiar el contenido de _11 TableMock_ y ejecutar:

```
npm install
```

- Instalamos la librería Axios:

```
  npm install --save axios
```

- Vamos a eliminar el fichero _memberMockData.ts_ del directorio _src/api_ .

- Vamos a reemplazar _memberAPI_ cargando los miembros con promesas:

_./src/api/memberAPI.ts_

```javascript
import { MemberEntity } from '../model/member';
import Axios, { AxiosError, AxiosResponse } from 'axios';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  getAllMembers(): Promise<MemberEntity[]> {
    const gitHubMembersUrl: string = 'https://api.github.com/orgs/lemoncode/members';

    return Axios.get<MemberEntity[]>(gitHubMembersUrl)
      .then(this.resolveMembers)
      .catch(this.onError);
  }

  private onError(err: AxiosError): MemberEntity[] {
    console.log(err.message);
    return [];
  }

  private resolveMembers({ data }: AxiosResponse<MemberEntity[]>): MemberEntity[] {
    const members: MemberEntity[] = data.map(gitHubMember => {
      let member: MemberEntity = {
        id: gitHubMember.id,
        login: gitHubMember.login,
        avatar_url: gitHubMember.avatar_url,
      };

      return member;
    });

    return members;
  }
}

export const memberAPI = new MemberAPI();

```

- Añadimos un nuevo componente _memberHead_ para crear la cabecera de la tabla:

_./src/memberHead.tsx_

```javascript
import * as React from 'react';
import { MemberEntity } from './model/member';

export const MemberHead = () =>
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
```

- Ahora vamos a actualizar nuestro componente _membersTable_.
 
_./src/memberTable.tsx_

- Importamos el nuevo componente:

```diff

+ import { MemberHead } from './memberHead';

```

- Modificamos la función render:

```diff
-<thead>
- <tr>
-    <th>
-      Avatar
-    </th>
-   <th>
-      Id
-    </th>
-    <th>
-      Name
-    </th>
-  </tr>
- </thead>
+ <thead>
+    <MemberHead />
+ </thead>
```

- Vamos a consumir el nuevo método de promesas para recuperar a los usuarios:

```diff
// Standard react lifecycle function:
// https://facebook.github.io/react/docs/component-specs.html
public componentDidMount() {
-  this.setState({members: memberAPI.getAllMembers()})
+  memberAPI.getAllMembers().then((members) =>
+    this.setState({members: members})
+  );
}
```

- Vamos a probar y verificar los resultados

```
npm start
```
