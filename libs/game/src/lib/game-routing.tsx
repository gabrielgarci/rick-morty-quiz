import Create from './pages/create/create';
import { RouteObject } from 'react-router-dom';

export const BASE_GAME_URL = 'game';

export enum GameUrl {
  Create = 'create',
  Play = 'play',
}

export const GAME_ROUTES: RouteObject[] = [
  {
    path: BASE_GAME_URL,
    children: [
      {
        path: GameUrl.Create,
        element: <Create />,
      },
    ],
  },
];

export const getGameUrl = (page: GameUrl) => `${BASE_GAME_URL}/${page}`;
