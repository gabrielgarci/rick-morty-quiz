import { RouteObject } from 'react-router-dom';
import Create from './pages/create/create';

export const BASE_GAME_URL = 'game';

export enum GameUrl {
  Create = 'create',
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
