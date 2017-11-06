import * as React from 'react';

interface Props {
  isVisible : boolean;
  children? : any;
}

export const SidebarComponent = (props: Props) => {
  const divStyle: React.CSSProperties = {
    width: (props.isVisible) ? '250px' : '0px'
  };
  return (
    <div id="mySidenav" className="sidenav" style={divStyle}>
        {props.children}
    </div>
  );
}
