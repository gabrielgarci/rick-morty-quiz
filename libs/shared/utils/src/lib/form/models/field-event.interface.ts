import { FormFieldValue } from './value.interface';

export interface FormFieldChangeEvent<T extends FormFieldValue, K = string> {
  target: {
    name: K;
    value: T;
  };
}
