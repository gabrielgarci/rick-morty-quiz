import {
  FormErrors,
  FormFieldValue,
  FormValidation,
  Validator,
} from '../../models';

export const getFieldError = <T extends FormFieldValue = FormFieldValue>(
  value: T,
  validators: Validator<T>[] = []
): string | undefined => {
  let errorMessage: string | undefined = undefined;

  for (const validator of validators) {
    const isValid = validator.func(value);
    if (!isValid) {
      errorMessage = validator.message ?? 'Invalid value';
      break;
    }
  }

  return errorMessage;
};

export const getFormErrors = <T extends Record<string, FormFieldValue>>(
  formValue: T,
  formValidators: FormValidation<T>
): FormErrors<T> =>
  Object.entries(formValidators).reduce((acc, [field, validators]) => {
    const value = formValue[field];
    const error = getFieldError(value, validators);
    return { ...acc, ...(error ? { [field]: error } : {}) };
  }, {});
