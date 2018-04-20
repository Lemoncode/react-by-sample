import { FieldValidationResult } from 'lc-form-validation';

export interface LoginFormErrors {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createEmptyDataFormErrors = (): LoginFormErrors => ({
  login: new FieldValidationResult(),
  password: new FieldValidationResult(),
});
