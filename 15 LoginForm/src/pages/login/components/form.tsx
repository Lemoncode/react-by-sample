import * as React from "react"
import { withRouter } from 'react-router-dom';

export const Form = withRouter(({history}) => {  
  const login = () => {
      history.push('/pageB');      
  }
  
  return (
    <form role="form">
      <fieldset>
        <div className="form-group">
          <input className="form-control" placeholder="E-mail" name="email" type="text"/>
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
        </div>
        <button className="btn btn-lg btn-success btn-block" onClick={login}>Login</button>   
      </fieldset>
    </form>  
  );
});
