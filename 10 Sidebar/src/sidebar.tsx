import * as React from 'react';

const classNames = require('./sidebar.css');

interface Props {
  isVisible: boolean;
}

const divStyle = (props: React.CSSProperties) => ({
  width: (props.isVisible) ? '23rem' : '0rem'
});


export const SidebarComponent : React.StatelessComponent<Props> = (props) => {
  return (
    <div id="mySidenav" className={classNames.sidenav} style={divStyle(props)}>
      {props.children}
    </div>
  );
}
