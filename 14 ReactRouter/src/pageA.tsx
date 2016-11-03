import * as React from "react"
import {Link} from "react-router";

export const PageA = () => {
  return (
    <div>
      <h2>Hello from page A</h2>
      <br/>
      <Link to="/pageB">Navigate to Page B</Link>
    </div>
  )
}
