import { FormFieldChangeEvent } from '@rick-morty-quiz/utils';

export interface CounterProps {
  name: string;
  label: string;
  onChange: (event: FormFieldChangeEvent<number>) => void;
  value?: number;
  maxValue?: number;
  minValue?: number;
  step?: number;
}
