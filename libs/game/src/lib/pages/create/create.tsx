import { Button, ButtonType, Counter, Input } from '@rick-morty-quiz/ui';
import styles from './create.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormErrors,
  FormFieldChangeEvent,
  FormFieldValue,
  FormValidation,
  Validator,
  getFieldError,
  getFormErrors,
} from '@rick-morty-quiz/utils';
import { CreateFormFields, CreateFormValue } from './create.interface';
import { GameUrl, getGameUrl } from '../../game-routing';

const FORM_VALIDATORS: FormValidation<CreateFormValue> = {
  [CreateFormFields.Name]: [
    {
      func: (value: string) => value.trim().length > 2,
      message: '*Name must have at least 3 characters',
    },
  ],
};

const Create = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<CreateFormValue>({
    [CreateFormFields.Name]: '',
    [CreateFormFields.Rounds]: 10,
  });

  const [formErrors, setFormErrors] = useState<FormErrors<CreateFormValue>>({});

  const handleChange = (event: FormFieldChangeEvent<FormFieldValue>): void => {
    const name = event.target.name as CreateFormFields;
    const { value } = event.target;
    const updatedForm: CreateFormValue = {
      ...formValue,
      [name]: value,
    };
    setFormValue(updatedForm);

    const validators = FORM_VALIDATORS[name] as
      | Validator<FormFieldValue>[]
      | undefined;

    if (validators) {
      const fieldError = getFieldError(value, validators);
      const updatedErrors: FormErrors<CreateFormValue> = {
        ...formErrors,
        [name]: fieldError,
      };
      setFormErrors(updatedErrors);
    }
  };

  const submitForm = (): void => {
    const errors = getFormErrors<CreateFormValue>(formValue, FORM_VALIDATORS);

    setFormErrors(errors);

    const hasErrors = Object.values(errors).filter((value) => !!value).length;

    if (hasErrors) {
      return;
    }

    const playPath = getGameUrl(GameUrl.Play);
    navigate(playPath);
  };

  return (
    <div className={styles['create-game']}>
      <div className={styles.form}>
        <Input
          name={CreateFormFields.Name}
          label="NAME"
          value={formValue[CreateFormFields.Name]}
          onChange={handleChange}
          errorMessage={formErrors[CreateFormFields.Name]}
        />
        <Counter
          name={CreateFormFields.Rounds}
          label="ROUNDS"
          value={formValue[CreateFormFields.Rounds]}
          step={5}
          minValue={10}
          maxValue={25}
          onChange={handleChange}
        />
      </div>
      <div className={styles['btn-group']}>
        <Link to="/">
          <Button type={ButtonType.Secondary} collapse={true}>
            CANCEL
          </Button>
        </Link>
        <Button collapse={true} onClick={submitForm}>
          ACCEPT
        </Button>
      </div>
    </div>
  );
};

export default Create;
