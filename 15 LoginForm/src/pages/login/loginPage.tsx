import * as React from "react"
import {Link} from 'react-router';
import {Header} from './header';
import {Form} from './form'

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <Header/>
            <Form/>
          </div>
        </div>
      </div>
    </div>
  );
}
