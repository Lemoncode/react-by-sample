import * as React from 'react';

const classNames = require('./styles.css');

interface Props {
  isVisible : boolean;
  children? : any;
}

export const SidebarComponent = (props: Props) => {
  const divStyle: React.CSSProperties = {
    width: (props.isVisible) ? '250px' : '0px'
  };
  return (
    <div id="mySidenav" className={classNames.sidenav} style={divStyle}>
        {props.children}
    </div>
  );
}
