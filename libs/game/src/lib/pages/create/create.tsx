import { http } from '@rick-morty-quiz/core';
import { Button, ButtonType, Counter, Input } from '@rick-morty-quiz/ui';
import {
  FormErrors,
  FormFieldChangeEvent,
  FormFieldValue,
  FormValidation,
  Validator,
  getFieldError,
  getFormErrors,
} from '@rick-morty-quiz/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Character,
  CharacterResponse,
  GameField,
  NewGame,
  NewGameForm,
} from '../../models';
import { initializeGame } from '../../store/game.slice';
import styles from './create.module.scss';

const MIN_ROUNDS = 10;
const MAX_ROUNDS = 25;

const FORM_VALIDATORS: FormValidation<NewGameForm> = {
  [GameField.Name]: [
    {
      func: (value: string) => value.trim().length > 2,
      message: '*Name must have at least 3 characters',
    },
  ],
};

const getTotalCharacters = async (): Promise<number> => {
  const url = 'https://rickandmortyapi.com/api/character';
  const response: CharacterResponse = await http.get(url);
  const numberOfCharacters = response.info.count;
  return numberOfCharacters;
};

const getRandomNumbers = (
  length: number,
  max: number,
  initialArray: number[] = []
): number[] => {
  const randomNumbers = Array.from({ length }, () =>
    Math.floor(Math.random() * max)
  );
  const randomNumbersWithoutDuplicated = [
    ...new Set([...initialArray, ...randomNumbers]),
  ];

  const desiredLength = initialArray.length + length;
  if (randomNumbersWithoutDuplicated.length === desiredLength)
    return randomNumbersWithoutDuplicated;

  const remainNumbers = length - randomNumbersWithoutDuplicated.length;

  return getRandomNumbers(remainNumbers, max, randomNumbersWithoutDuplicated);
};

const getRandomCharacters = async (rounds: number): Promise<Character[]> => {
  const totalCharacters = await getTotalCharacters();
  const randomNumbers = getRandomNumbers(rounds, totalCharacters);
  const joinedRandomNumbers = randomNumbers.join(',');
  const url = `https://rickandmortyapi.com/api/character/${joinedRandomNumbers}`;
  const response: Character[] = await http.get(url);
  return response;
};

const Create = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState<NewGameForm>({
    [GameField.Name]: '',
    [GameField.Rounds]: 10,
  });

  const [formErrors, setFormErrors] = useState<FormErrors<NewGameForm>>({});

  const handleChange = (event: FormFieldChangeEvent<FormFieldValue>): void => {
    const fieldName = event.target.name as keyof NewGameForm;
    const { value } = event.target;
    const updatedForm: NewGameForm = {
      ...formValue,
      [fieldName]: value,
    };
    setFormValue(updatedForm);

    const validators = FORM_VALIDATORS[fieldName] as
      | Validator<FormFieldValue>[]
      | undefined;

    if (validators) {
      const fieldError = getFieldError(value, validators);
      const updatedErrors: FormErrors<NewGameForm> = {
        ...formErrors,
        [fieldName]: fieldError,
      };
      setFormErrors(updatedErrors);
    }
  };

  const submitForm = async (): Promise<void> => {
    const errors = getFormErrors<NewGameForm>(formValue, FORM_VALIDATORS);

    setFormErrors(errors);

    const hasErrors = Object.values(errors).filter((value) => !!value).length;

    if (hasErrors) {
      return;
    }

    const characters = await getRandomCharacters(formValue[GameField.Rounds]);

    const newGameData: NewGame = {
      ...formValue,
      [GameField.Characters]: characters,
    };

    dispatch(initializeGame(newGameData));
  };

  return (
    <div className={styles['create-game']}>
      <div className={styles.form}>
        <Input
          name={GameField.Name}
          label="NAME"
          value={formValue[GameField.Name]}
          onChange={handleChange}
          errorMessage={formErrors[GameField.Name]}
        />
        <Counter
          name={GameField.Rounds}
          label="ROUNDS"
          value={formValue[GameField.Rounds]}
          step={5}
          minValue={MIN_ROUNDS}
          maxValue={MAX_ROUNDS}
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
