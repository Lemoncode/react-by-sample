import * as React from "react"
import { Link } from 'react-router-dom';
import { Session } from '../../common/'
import { checkPropTypes } from "prop-types";


interface Props {
  login : string;
}

const LoginComponent = (props: Props) =>
  <>
    <h2>Hello from page B</h2>
    <br />
    <br />
    <h3>Login: {props.login}</h3>

    <Link to="/">Navigate to Login</Link>
  </>


export const PageB = () =>
  <div>
    <Session
        render={
          login => (            
            <LoginComponent login={login}></LoginComponent>
            )}
    >
    </Session>
  </div>
