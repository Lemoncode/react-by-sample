import * as React from "react"
import {hashHistory} from 'react-router'
import {LoginEntity} from '../../model/login';
import {FormField} from '../common/formField';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : () => void;
}

 function updateFieldValue(fieldName: string, fieldValue: any){
    const newLoginEntity = this.props.loginInfo;
    newLoginEntity[fieldName] = fieldValue;
    this.props.updateLoginInfo(newLoginEntity);
  }

export const Form = () => {
    return (
      <div className="panel-body">
        <form role="form">
          <fieldset>
            <FormField name="login" type="text" text="E-mail" updateFieldValue={this.updateFieldValue.bind(this)} />
            <FormField name="password" type="password" text="Password" updateFieldValue={this.updateFieldValue.bind(this)} />
            <input className="btn btn-lg btn-success btn-block" value="Login"
              onClick={(e) => { this.props.performLogin() } }
              />
          </fieldset>
        </form>
      </div>
    );
}
