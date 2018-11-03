## 15 Login form Validation

Vamos a añadir validaciones de apoyo a este formulario.

Para esto usaremos la librería lc-form-validation

## Resumen de pasos:

- Instala la librería lc-form-validation.
- Refactoriza el componente input a un componente común e incluye información de errores de validación.
- Define la validación para el formulario.
- Vamos a engancharlo.

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o superior) si no las tenemos instaladas en nuestro ordenador.

> Verifica que estás usando al menos node v6.x.x and npm 3.x.x usando los comandos `node -v` y `npm -v` en un terminal/consola. Versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de _15 React Form_ y execute _npm install_.

```bash
npm install
```

- Instala la librería (esta incluye los tipos).

```bash
npm install lc-form-validation --save-dev
```

- Para evitar tener mucho código repetido vamos a mover a comun un componente input, incluyendo este label mas el texto de validación.

_./common/forms/textFieldForm.tsx_

```tsx
import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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
  const { name, label, onChange, value, error, type } = props;
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

- Ahora definamos una validación básica para el formulario, queremos asegurar de que ambos campos están informado.

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

- Crea ahora a una clase a ambos dataFormErrors.

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

- Ahora vamos por el lado del componente.

- Primero vamos a añadir el estado al dataFormErrors del componente.

_./src/pages/login/loginPage.tsx_

```diff
import { isValidLogin } from '../../api/login';
+ import { LoginFormErrors } from './viewmodel';

interface State {
  loginInfo: LoginEntity;
  showLoginFailedMsg: boolean;
+  loginFormErrors : LoginFormErrors;
}
```

- Ahora vamos a actualizar la llamada onUpdate para incluir la validación.

_./src/pages/login/loginPage.tsx_

// Adding imports
```diff
import { isValidLogin } from '../../api/login';
+ import { LoginFormErrors, createDefaultLoginFormErrors } from './viewmodel';
+ import { loginFormValidation } from './loginValidations';
```

_./src/pages/login/loginPage.tsx_

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

- Necesitamos pasar para abajo dataFormErrors

_./src/loginPage.tsx_

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

- Ahora necesitamos definir la propiedad en el componente loginForm.

_./src/loginForm.tsx_

```diff
import { LoginEntity } from "../../model/login";
+ import { LoginFormErrors } from './viewmodel';

interface Props {
  loginInfo: LoginEntity;
  onUpdateField: (string, any) => void;
  onLogin: () => void;
+  loginFormErrors : LoginFormErrors;
}
```

- Ahora actualiza nuestros componentes para encontrar el componente input nuevo.

_./src/common/pages/loginForm.tsx_

```diff
import { LoginEntity } from "../../model/login";
import { LoginFormErrors } from './viewmodel';
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

- Vamos a intentarlo.

```bash
npm start
```

- Y vamos a añdir un alert (Ejercicio y una notificación) cuando el usuario pulse y los campos del formulario son válidos.

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
+          }
+      })
  }
```

// TODO: mapFormValidationResultToFieldValidationErrors

> Ejercicio crea una información genérica dentro del snackbar y elimina el alert.