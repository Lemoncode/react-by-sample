import * as React from 'react';


export const SidebarComponent = (props: {isVisible : boolean}) => {
  var divStyle = {
     width: (props.isVisible) ?  '250px':'0px'
   };

    return (
      <div id="mySidenav" className="sidenav" style={divStyle}>
          <span>Basic side bar, first steps</span>
      </div>
    );
}
