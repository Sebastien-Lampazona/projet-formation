import { Navigate } from 'react-router-dom';
import Layout from 'src/components/Layout';
import BeerList from 'src/pages/BeerList';

export default [
  { path: '/', breadcrumb: 'Home', element: <Navigate replace to="/beers/list" /> },
  {
    element: <Layout />,
    children: [
      {
        path: 'beers',
        children: [
          {
            path: 'list',
            breadcrumb: 'Liste des bières',
            element: <BeerList />,
          },
        ],
      },
    ],
  },
];
