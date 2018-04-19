import * as React from "react"

export const ContentCenter : React.StatelessComponent = (props) => 
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
      {props.children}
      </div>
    </div>
  </div>