import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from '@rick-morty-quiz/game';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
