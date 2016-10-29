import * as React from 'react';

interface Props {
  isVisible : boolean;
  children? : any;
}

export function SidebarComponent (props:Props) {
  return (
    <div id="mySidenav" className="sidenav" style={{width: (props.isVisible) ? '250px' : 0}}>
        {props.children}
    </div>
  );
}
