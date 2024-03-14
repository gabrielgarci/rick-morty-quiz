import { FormFieldValue } from './value.interface';

export type FormErrors<T extends Record<string, FormFieldValue>> = Partial<{
  [K in keyof T]: string | undefined;
}>;
