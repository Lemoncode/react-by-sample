import * as React from "react"
import { history } from "../../history"

export const Form = () => {
  function login() {
      history.push('/pageB');      
  }

  return (
    <div className="panel-body">
      <form accept-charset="UTF-8" role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" placeholder="E-mail" name="email" type="text"/>
      		</div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
          </div>
          <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"
            onClick={login}
          />
        </fieldset>
      </form>
    </div>
  );
}
