import { FormFieldChangeEvent } from '@rick-morty-quiz/utils';

export interface InputProps {
  name: string;
  onChange: (event: FormFieldChangeEvent<string>) => void;
  errorMessage?: string;
  label?: string;
  value?: string;
  placeholder?: string;
}
