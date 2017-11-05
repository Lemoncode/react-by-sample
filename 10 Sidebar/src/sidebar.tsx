import * as React from 'react';

const classNames = require('./styles.css');

interface Props {
  isVisible : boolean;
  children? : any;
}

export function SidebarComponent (props:Props) {
  return (
    <div id="mySidenav" className={classNames.sidenav} style={{width: (props.isVisible) ? '250px' : 0}}>
        {props.children}
    </div>
  );
}
