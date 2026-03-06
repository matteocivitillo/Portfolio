import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Root,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: 'about',
          Component: AboutPage,
        },
        {
          path: 'projects',
          Component: ProjectsPage,
        },
        {
          path: 'progetti/:categoryId',
          Component: CategoryPage,
        },
      ],
    },
  ],
  { basename: '/Portfolio/' }
);
