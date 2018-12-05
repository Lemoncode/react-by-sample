import * as React from "react"
import { Link } from 'react-router-dom';
import { SessionContext } from '../../common/'

export const PageB = () =>
  <div>
    <SessionContext.Consumer>
      {
        ({ login }) => (
          <>
            <h2>Hello from page B</h2>
            <br />
            <br />
            <h3>Login: {login}</h3>

            <Link to="/">Navigate to Login</Link>
          </>
        )
      }
    </SessionContext.Consumer>
  </div>
