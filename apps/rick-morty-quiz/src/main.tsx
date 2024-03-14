import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { GAME_ROUTES } from '@rick-morty-quiz/game';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './app/home';

const router = createBrowserRouter(
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
