import { Character } from './character.interface';

export enum GameField {
  Name = 'name',
  Rounds = 'rounds',
  CurrentRounds = 'currentRound',
  Characters = 'characters',
  Score = 'score',
}

export type NewGameForm = {
  [GameField.Name]: string;
  [GameField.Rounds]: number;
};

export type NewGame = NewGameForm & {
  [GameField.Characters]: Character[];
};
