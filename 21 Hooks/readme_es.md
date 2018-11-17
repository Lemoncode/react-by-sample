## Intro

En este ejemplo haremos uso de hooks un concepto chulo que se introdució en React 16.7.0

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x y npm 3.x.x usando los comandos `node -v` y `npm -v` en una terminal o consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Vamos a copiar el código del ejemplo _12_TableHttp_.

- Vamos a instalar las dependencias.

```bash
npm install
```

- Ahora vamos a desinstalar la versión actual de react y react-dom

```bash
npm uninstall react react-dom --save
```

- E instalamos la versión 16.7 alfa:

```bash
npm install react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0 --save
```

- Vamos a mover el componente actual basado en la clase _membersTable.tsx_ a uno sin estado (reemplazaremos el estado actual usando hooks).

- Vamos a empezar por limpiar el código y añadiendo un hook que mantenga la lista de mienbros.

_./src/membersTable.tsx_

```diff
- interface Props {
- }

- // We define members as a state (the compoment holding this will be a container
- // component)
- interface State {
-  members: Array<MemberEntity>
-}

- // Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
- export class MembersTableComponent extends React.Component<Props, State> {
+ export const MembersTableComponent = () => {
-  constructor(props: Props) {
-    super(props);
-    // set initial state
-    this.state = { members: [] };
-  }

+  const [members, setMembers] = React.useState([]);

-  // Standard react lifecycle function:
-  // https://facebook.github.io/react/docs/component-specs.html
-  public componentDidMount() {
+  const loadMembers = () => {
    memberAPI.getAllMembers().then((members) =>
-      this.setState({ members: members })
+       setMembers(members)
    );
  }

-  public render() {

    return (
      <div className="row">
        <h2> Members Page</h2>
        <table className="table">
          <thead>
            <MemberHead />
          </thead>
          <tbody>
            {
-              this.state.members.map((member: MemberEntity) =>
+              members.map((member: MemberEntity) =>
                <MemberRow key={member.id} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
-  }
}
```

- Ahora tenemos un gran problema... _componentDidMount_ no tenemos esto en el componente hooks, ¿Como podemos hacer esto? Para ello podemos hacer uso de los hooks de react _useEffect_.

_./src/membersTable.tsx_

```diff
export const MembersTableComponent = () => {

  const [members, setMembers] = React.useState([]);

  const loadMembers = () => {
    memberAPI.getAllMembers().then((members) =>
      setMembers(members)
    );
  }

+ React.useEffect(() => {
+   loadMembers();
+ })
```

- Eso fué genial, pero ¿Y si pudiéramos estár interesandos en reutilizar esté hook? Podríamos extraer esto en una función:

_./src/membersTable.tsx_

```diff
+ function useMembers() {
+  const [members, setMembers] = React.useState([]);
+
+  const loadMembers = () => {
+    memberAPI.getAllMembers().then((members) =>
+      setMembers(members)
+    );
+  }
+
+  return {members, loadMembers };
+}

export const MembersTableComponent = () => {
+  const { members, loadMembers } = useMembers();
-  const [members, setMembers] = React.useState([]);

-  const loadMembers = () => {
-    memberAPI.getAllMembers().then((members) =>
-      setMembers(members)
-    );
-  }

  React.useEffect(() => {
    loadMembers();
  });
```

-  Ahora si lo ejecutamos, se ejecutará en cada repetición, para limitar esto podemos pasar un array vació como un segundo argumento de _useEffect_, esto le dice a React que su efecto no dependen de ningún valor de props o del estado, esto nunca necesita volver a ejecutar.

```diff
  React.useEffect(() => {
    loadMembers();
-  });
+ },[]);
```

> Mas información sobre _hooks-effect_: https://reactjs.org/docs/hooks-effect.html