import { FormFieldValue } from './value.interface';

export interface Validator<T extends FormFieldValue> {
  func: (value: T) => boolean;
  message?: string;
}

export type FormValidation<T extends Record<string, FormFieldValue>> = Partial<{
  [K in keyof T]: Validator<T[K]>[];
}>;
