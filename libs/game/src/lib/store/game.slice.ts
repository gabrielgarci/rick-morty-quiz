import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getRenderWithProvidersInstance } from '@rick-morty-quiz/utils';
import { GameField, NewGame } from '../models';
import { Character } from '../models/character.interface';

export const GAME_FEATURE_KEY = 'game';

export interface GameState {
  [GameField.Name]: string | null;
  [GameField.Rounds]: number | null;
  [GameField.CurrentRounds]: number;
  [GameField.Score]: number;
  [GameField.Characters]: Character[];
}

const initialState: GameState = {
  [GameField.Name]: null,
  [GameField.Rounds]: null,
  [GameField.CurrentRounds]: 1,
  [GameField.Score]: 0,
  [GameField.Characters]: [],
};

export const gameSlice = createSlice({
  name: GAME_FEATURE_KEY,
  initialState,
  reducers: {
    initializeGame: (state, action: PayloadAction<NewGame>) => {
      state[GameField.Name] = action.payload[GameField.Name];
      state[GameField.Rounds] = action.payload[GameField.Rounds];
      state[GameField.Characters] = action.payload[GameField.Characters];
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const { initializeGame } = gameSlice.actions;

export const getGameState = (rootState: {
  [GAME_FEATURE_KEY]: GameState;
}): GameState => rootState[GAME_FEATURE_KEY];

type GameSliceState = ReturnType<typeof getGameState>;

export const renderWithProviders =
  getRenderWithProvidersInstance<GameSliceState>(gameReducer);
