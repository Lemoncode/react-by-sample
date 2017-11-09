import * as React from 'react';

interface Props {
  isVisible : boolean;
  children? : any;
}

const divStyle = (props): React.CSSProperties => ({
  width: (props.isVisible) ? '250px' : '0px'
});

export const SidebarComponent : React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div id="mySidenav" className="sidenav" style={divStyle}>
        {props.children}
    </div>
  );
}
