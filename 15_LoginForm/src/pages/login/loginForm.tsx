import * as React from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { LoginEntity } from "../../model/login";

interface Props {
  onLogin: () => void;
  onUpdateField: (string, any) => void;
  loginInfo : LoginEntity;
}

export const LoginForm = (props: Props) => {
  const { onLogin, onUpdateField, loginInfo } = props;

  const onTexFieldChange = (fieldId) => (e) => {
    onUpdateField(fieldId, e.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <TextField
        label="Name"
        margin="normal"
        value={loginInfo.login}
        onChange={onTexFieldChange('login')}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        value={loginInfo.password}
        onChange={onTexFieldChange('password')}
      />
      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}
