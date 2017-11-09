import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible : boolean;
  children? : any;
}

const divStyle = (props): React.CSSProperties => ({
  width: (props.isVisible) ? '250px' : '0px'
});

export const SidebarComponent : React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div id="mySidenav" className={classNames.sidenav} style={divStyle}>
        {props.children}
    </div>
  );
}
