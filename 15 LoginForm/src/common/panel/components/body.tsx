import * as React from "react"

interface Props {
}

export const Body : React.StatelessComponent<Props> = (props) => 
  <li className="list-group-item">
    {props.children}
  </li>