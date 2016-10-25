import * as React from "react"

import {hashHistory} from 'react-router'

export const Form = () => {

  function login() {
      hashHistory.push('/pageB');      
  }

  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" placeholder="E-mail" name="email" type="text"/>
      		</div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
          </div>
          <input className="btn btn-lg btn-success btn-block" value="Login"
            onClick={login}
          />
        </fieldset>
      </form>
    </div>
  );
}
