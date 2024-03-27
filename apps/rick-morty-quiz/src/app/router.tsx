import { GAME_ROUTES } from '@rick-morty-quiz/game';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './home';

export default createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    ...GAME_ROUTES,
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
  { basename: '/rick-morty-quiz' }
);
