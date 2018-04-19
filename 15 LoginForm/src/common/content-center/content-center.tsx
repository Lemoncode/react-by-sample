import * as React from "react"

export const ContentCenter : React.StatelessComponent = (props) => 
  <div className="container">
    <div className="row">
      <div className="mx-auto">
      {props.children}
      </div>
    </div>
  </div>