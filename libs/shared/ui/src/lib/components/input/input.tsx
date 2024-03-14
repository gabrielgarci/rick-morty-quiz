import { FocusEvent } from 'react';
import { InputProps } from './input.interface';
import style from './input.module.scss';

export const Input = (inputProps: InputProps) => {
  const { placeholder, name, label, value, errorMessage, onChange } =
    inputProps;

  const handleValueChange = (event: FocusEvent<HTMLInputElement>) => {
    const proposedValue = event.target?.value;
    onChange({ target: { name, value: proposedValue } });
  };

  return (
    <div
      className={`${style.input} ${errorMessage ? style['input--error'] : ''}`}
      data-testid="input-wrapper"
    >
      {label && (
        <p className={style['input__label']} data-testid="input-label">
          {label}
        </p>
      )}
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        onBlur={handleValueChange}
        data-testid="input-field"
      />
      <p className={style['input__error-message']} data-testid="input-error">
        {errorMessage}
      </p>
    </div>
  );
};
