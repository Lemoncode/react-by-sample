import * as React from "react"
import { Panel, ContentCenter } from '../../common';
import { Form } from './components/form';
import { LoginEntity } from "../../model/login";
import {LoginFormErrors} from './viewmodel';

interface Props {
  loginInfo: LoginEntity;
  updateField: (string, any) => void;
  doLogin: () => void;
  loginFormErrors : LoginFormErrors;
}


export const LoginPage = (props : Props) =>
  <ContentCenter>
    <Panel title="Please sign in">
      <Form
        {...props} 
      />    
    </Panel>
  </ContentCenter>

