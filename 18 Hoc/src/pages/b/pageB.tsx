import * as React from "react"
import { Link } from 'react-router-dom';
import { SessionContext, withSessionContext } from '../../common/'

interface Props {
  login : string;
}

const PageBInner = (props : Props) =>
  <>
    <h2>Hello from page B</h2>
    <br />
    <br />
    <h3>Login: {props.login}</h3>

    <Link to="/">Navigate to Login</Link>
  </>

export const PageB = withSessionContext(PageBInner);