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