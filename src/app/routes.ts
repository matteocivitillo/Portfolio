import { createHashRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';

export const router = createHashRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'progetti/:categoryId',
        Component: CategoryPage,
      },
    ],
  },
]);
