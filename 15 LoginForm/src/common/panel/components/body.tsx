import * as React from "react"

interface Props {
}

export const Body : React.StatelessComponent<Props> = (props) => 
  <div className="list-group-item">
    {props.children}
  </div>