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

_./common/forms/input/input.tsx_

```tsx
import * as React from "react";

interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  value: string;
  error?: string;
  type? : string;
}

const defaultProps : Partial<Props> = {
  type: 'text'
}

const buildWrapperClass = (error : string) : string => 
  "form-group" + (
      (error && error.length > 0) ? 
        "has-error" : 
        ""
      );


export const Input : React.StatelessComponent<Props> = (props) => 
      <div className={buildWrapperClass(props.error)}>
        <label htmlFor={props.name}>{props.label}</label>
        <div className="field">
          <input type="text"
            name={props.name}
            className="form-control"
            placeholder={props.placeholder}
            ref={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
          <div className="input">{props.error}</div>
        </div>
      </div>

Input.defaultProps = defaultProps;
```

- Now let's define a basic validation for the form, we want to ensure both fields are informed.

_./src/pages/login/components_

```typescript
import {
  createFormValidation, ValidationConstraints, Validators,
} from 'lc-form-validation';

const dataValidationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required },
    ],
    password: [
      { validator: Validators.required },
    ],    
  },
};

export const dataValidation = createFormValidation(dataValidationConstraints);
```

- Let's create now a class to hold the dataFormErrors.

_./src/login/viewmodel.ts_

```typescript
import { FieldValidationResult } from 'lc-form-validation';

export interface LoginFormErrors {
  login: FieldValidationResult;
  password: FieldValidationResult;
}
```

- Now let's go for the component side.

- First let's add the dataFormErrors to the state of the component.

_./src/pages/login/loginPageContainer.tsx_

```diff
import { isValidLogin } from '../../api/login';
+ import {LoginFormErrors} from './viewmodel.ts';

interface State {
  loginInfo: LoginEntity,
+  loginFormErrors : LoginFormErrors;
}
```

- Now let's update the onUpdate callback to include the validation.

_./src/pages/login/loginPageContainer.tsx_

// Adding imports
```diff
import { isValidLogin } from '../../api/login';
+ import {dataValidation} from './validation'
```

_./src/pages/login/loginPageContainer.tsx_

```diff
+  // This could be simplified and made in one go
  updateLoginField = (name, value) => {
+    dataValidation.validateField(this.state.loginInfo, name, value)
+    .then((fieldValidationResult) => {

+        this.setState({loginFormErrors: {
+          ...this.state.loginFormErrors,
+          [name]: fieldValidationResult,
+        });

        this.setState({loginInfo: {
          ...this.state.loginInfo,
          [name]: value,
        });
+   });
  }
```

- We need to pass down dataFormErrors

_./src/loginPageContainer.tsx_

```diff
  public render() {
    return (
      <LoginPage
        loginInfo={this.state.loginInfo}
        updateField={this.updateLoginField}
        doLogin={this.performLogin}
+       loginFormErrors={this.state.loginFormErrors} 
      />
    )
  }
```

- Now we need to define the property in the loginPage component.

_./src/loginPage.tsx_

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

- And let's define it in the form component.

```diff
import { LoginEntity } from "../../../model/login";
+ import {LoginFormErrors} from '../viewmodel';
+ import { Input } from '../../../common/forms/input/input';

interface Props {
  loginInfo: LoginEntity;
  updateField: (string, any) => void;
  doLogin: () => void;  
+  loginFormErrors : LoginFormErrors;
}
```

- Now let's update our components to match the new input component.

```diff
export const Form = (props : Props) =>   
    <form role="form">
      <fieldset>
-        <div className="form-group">
-          <input 
-            className="form-control" 
-            placeholder="E-mail" 
-            name="login" 
-            type="text"
-            onChange={onChange(props)}
-            value={props.loginInfo.login}
-          />
+        <Input   
+          name="login"
+          label="login"
+          onChange={onChange(props)}
+          placeholder="E-mail"
+          value={props.loginInfo.login}
+          error={props.loginFormErrors.login.errorMessage}
+        />        
-        </div>
-        <div className="form-group">
-          <input className="form-control" 
-                placeholder="Password" 
-                name="password" 
-                type="password" 
-                onChange={onChange(props)}
-                value={props.loginInfo.password}
-                />
+        <Input   
+          name="password"
+          label="password"
+          onChange={onChange(props)}
+          placeholder="password"
+          value={props.loginInfo.password}
+          error={props.loginFormErrors.password.errorMessage}
+          type="password"
+        />        
        </div>
        <button type="button" className="btn btn-lg btn-success btn-block" onClick={props.doLogin}>Login</button>   
      </fieldset>
    </form>  
```

- Let's give a try.

```bash
npm start
```

- And let's add an alert (Excercise and a notification) when the user clicks and
the form all the fields are valid.

_./src/pages/login/loginPageContainer.tsx_

```diff
  performLogin = () => {
+    dataValidation.validateForm(this.state.loginInfo)
+      .then((FormValidationResult) => {
+          if(FormValidationResult.succeeded) {
            if (isValidLogin(this.state.loginInfo)) {
              this.props.history.push('/pageB');
            }      
+          } else {
+            alert('error, review the fields');
+          }
+      })
  }
```

> Excercise add property styling using CSS Modules nad proper react alert.
