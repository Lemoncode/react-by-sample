import * as React from "react";
import { withRouter } from 'react-router-dom';
import {LoginEntity} from '../../model/login';
import { RouteComponentProps } from "react-router";

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17181
interface Props  {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : () => void;   
}


export const Form = (props : Props) => {    
  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
            <input 
              className="form-control" 
              placeholder="E-mail" 
              name="email" 
              type="text"
              value={props.loginInfo.login}
              onChange={(e : any) =>
                props.updateLoginInfo({login: e.target.value, password: props.loginInfo.password
                })}              
              />
      		</div>
          <div className="form-group">
            <input 
              className="form-control" 
              placeholder="Password" 
              name="password" 
              type="password" 
              value={props.loginInfo.password}
              onChange={(e : any) =>
                props.updateLoginInfo({login: props.loginInfo.login, password: e.target.value 
                })}
              />
          </div>
          <button className="btn btn-lg btn-success btn-block" onClick={props.performLogin}>Login</button>                        
        </fieldset>
      </form>
    </div>
  );
};
