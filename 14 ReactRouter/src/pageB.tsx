import * as React from "react"
import {Link} from "react-router";

export const PageB = () => {
  return (
    <div>
      <h2>Hello from page B</h2>
      <br/>
      <Link to="/pageA">Navigate to Page A</Link>
    </div>
  )
}
