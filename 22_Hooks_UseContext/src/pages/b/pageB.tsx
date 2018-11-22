import * as React from "react"
import { Link } from 'react-router-dom';
import { Session } from '../../common/';
import { SessionContext } from '../../common';

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


export const PageB = () => {
  const loginContext = React.useContext(SessionContext);

  return (
    <div>
      <LoginComponent login={loginContext.login}></LoginComponent>              
    </div>
  )
}
