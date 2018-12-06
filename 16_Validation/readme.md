# 15 Login form Validation

Let's add validation support to this form.

For this we will use lc-form-validation library

Summary steps:

- Install lc-form-validation library.
- Refactor input component to a common component and include error validation info.
- Let's define the validation for the form.
- Let's hook it.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _15 React Form_ and execute _npm install_.

```bash
npm install
```

- Let's install the library (it includes already the typings).

```bash
npm install lc-form-validation --save-dev
```

- To avoid having too much repeated code let's move to common an input component, including it's
label plus validation text.

_./common/forms/textFieldForm.tsx_

```tsx
import * as React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  name: string;
  label: string;
  onChange: any;
  value: string;
  error?: string;
  type? : string;
}

const defaultProps : Partial<Props> = {
  type: 'text', 
}

const onTextFieldChange = (fieldId : string, onChange: (fieldId, value) => void) => (e) => {
  onChange(fieldId, e.target.value);
}

export const TextFieldForm : React.StatelessComponent<Props> = (props) => {
  const {name, label, onChange, value, error, type} = props;
  return (
    <>
        <TextField
          label={label}
          margin="normal"
          value={value}
          type={type}
          onChange={onTextFieldChange(name, onChange)}
        />
        <Typography 
          variant="caption" 
          color="error"
          gutterBottom>
          {props.error}
        </Typography>        
    </>
  )
}

```


- Now let's define a basic validation for the form, we want to ensure both fields are informed.

_./src/pages/login/loginValidations.ts_

```typescript
import {
  createFormValidation, ValidationConstraints, Validators,
} from 'lc-form-validation';

const loginFormValidationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required },
    ],
    password: [
      { validator: Validators.required },
    ],    
  },
};

export const loginFormValidation = createFormValidation(loginFormValidationConstraints);
```

- Let's create now a class to hold the dataFormErrors.

_./src/login/viewmodel.ts_

```typescript
import { FieldValidationResult } from 'lc-form-validation';

export interface LoginFormErrors {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createDefaultLoginFormErrors = (): LoginFormErrors => ({
  login: new FieldValidationResult(),
  password: new FieldValidationResult(),
});
```

- Now let's go for the component side.

- First let's add the dataFormErrors to the state of the component.

_./src/pages/login/loginPage.tsx_

```diff
import { isValidLogin } from '../../api/login';
+ import {LoginFormErrors} from './viewmodel';

interface State {
  loginInfo: LoginEntity;
  showLoginFailedMsg: boolean;
+  loginFormErrors : LoginFormErrors;
}
```

- Now let's update the onUpdate callback to include the validation.

_./src/pages/login/loginPage.tsx_

// Adding imports
```diff
import { isValidLogin } from '../../api/login';
+ import {LoginFormErrors, createDefaultLoginFormErrors} from './viewmodel';
+ import { loginFormValidation } from './loginValidations';
```

_./src/pages/login/loginPageContainer.tsx_

```diff
  constructor(props) {
    super(props);

    this.state = { loginInfo: createEmptyLogin(),
                   showLoginFailedMsg : false,
+                   loginFormErrors: createDefaultLoginFormErrors(),
    }
  }

+  // This could be simplified and made in one go
  updateLoginField = (name, value) => {
    this.setState({loginInfo: {
      ...this.state.loginInfo,
      [name]: value,
      }
    });

+    loginFormValidation.validateField(this.state.loginInfo, name, value)
+    .then((fieldValidationResult) => {

+        this.setState({loginFormErrors: {
+          ...this.state.loginFormErrors,
+          [name]: fieldValidationResult,
+        });
+   });
  }
```

- We need to pass down dataFormErrors

_./src/loginPageContainer.tsx_

```diff
  public render() {
    return (
      <LoginPage
        onLogin={this.onLogin}
        onUpdateField={this.onUpdateLoginField}
        loginInfo={this.state.loginInfo}
+       loginFormErrors={this.state.loginFormErrors} 
      />
    )
  }
```

- Now we need to define the property in the loginForm component.

_./src/loginForm.tsx_

```diff
import { LoginEntity } from "../../model/login";
+ import {LoginFormErrors} from './viewmodel';

interface Props {
  loginInfo: LoginEntity;
  updateField: (string, any) => void;
  doLogin: () => void;
+  loginFormErrors : LoginFormErrors;
}
```


- Now let's update our components to match the new input component.

_./src/common/pages/loginForm.tsx_

```diff
import { LoginEntity } from "../../model/login";
import {LoginFormErrors} from './viewmodel';
+ import { TextFieldForm } from '../../common/forms/textFieldForm';
```

_./src/common/pages/loginForm.tsx_

```diff
export const LoginForm = (props: Props) => {
-   const { onLogin, onUpdateField, loginInfo } = props;
+   const { onLogin, onUpdateField, loginInfo, loginFormErrors } = props;

-  const onTexFieldChange = (fieldId) => (e) => {
-    onUpdateField(fieldId, e.target.value);
-  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
-      <TextField
-        label="Name"
-        margin="normal"
-        value={loginInfo.login}
-        onChange={onTexFieldChange('login')}
-      />
+      <TextFieldForm
+        label="Name"
+        name="login"
+        value={loginInfo.login}
+        onChange={onUpdateField}
+        error={loginFormErrors.login.errorMessage}
+      />

-      <TextField
-        label="Password"
-        type="password"
-        margin="normal"
-        value={loginInfo.password}
-        onChange={onTexFieldChange('password')}
-      />
+      <TextFieldForm
+        label="Password"
+        name="password"
+        value={loginInfo.password}
+        onChange={onUpdateField}
+        error={loginFormErrors.password.errorMessage}
+      />


      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}
```

- Let's give a try.

```bash
npm start
```

- And let's add an alert (Excercise and a notification) when the user clicks and
the form all the fields are valid.

_./src/pages/login/loginPageContainer.tsx_

```diff
  onLogin = () => {
+    loginFormValidation.validateForm(this.state.loginInfo)
+      .then((formValidationResult) => {
+          if(formValidationResult.succeeded) {
            if (isValidLogin(this.state.loginInfo)) {
              this.props.history.push('/pageB');
            } else {
              this.setState({ showLoginFailedMsg: true });
            }      
+          } else {
+            alert('error, review the fields');
+          const updatedLoginFormErrors = {
+             ...this.state.loginFormErrors,
+             ...formValidationResult.fieldErrors,
+          }

+          this.setState({loginFormErrors: updatedLoginFormErrors})

+          }
+      })
  }
```

// TODO: mapFormValidationResultToFieldValidationErrors

> Excercise create a generic info snack bar and remove alert.
