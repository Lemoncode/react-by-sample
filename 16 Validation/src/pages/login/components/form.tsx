import * as React from "react"
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import { LoginEntity } from "../../../model/login";
import { LoginFormErrors } from '../viewmodel';
import { Input } from '../../../common/forms/input/input';

interface Props {
  loginInfo: LoginEntity;
  updateField: (string, any) => void;
  doLogin: () => void; 
  loginFormErrors : LoginFormErrors; 
}

const onChange = (props : Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
  props.updateField(e.target.name, e.target.value);
}

export const Form = (props : Props) =>   
    <form role="form">
     <fieldset>        
        <Input   
          name="login"
          label="login"
          onChange={onChange(props)}
          placeholder="E-mail"
          value={props.loginInfo.login}
          error={props.loginFormErrors.login.errorMessage}
        />        
        <Input   
          name="password"
          label="password"
          onChange={onChange(props)}
          placeholder="password"
          value={props.loginInfo.password}
          error={props.loginFormErrors.password.errorMessage}
          type="password"
        />        
        
        <button type="button" className="btn btn-lg btn-success btn-block" onClick={props.doLogin}>Login</button>   
      </fieldset>
    </form>  
