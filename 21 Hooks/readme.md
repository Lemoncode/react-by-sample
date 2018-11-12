# Intro

In this sample we will make use of hooks a cool concept introduced in React 16.7.0

# Steps

- Let's copy the code from sample *12_TableHttp*.

- Let's install the dependencies.

```bash
npm install
```

- Now we are going to uninstall current version of react and react-dom:

```bash
npm uninstall react react-dom --save
```

- And install the 16.7 alfa version:

```bash
npm install react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0 --save
```

- We are going to move the current _membersTable.tsx_ class based component to an
stateless one (we will replace the current state using hooks).

- Let's start by cleaning up code and adding a hook to hold the members list

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

- Now we have tetchy issue... _componentDidMount_ we don't have this on hooks component
how can we dod that? To do that we can make use of react hooks _useEffect_

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