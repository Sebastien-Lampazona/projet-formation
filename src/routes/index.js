import Layout from 'src/components/Layout';
import ExamplePage from 'src/pages/ExamplePage';
import Home from 'src/pages/Home';

export default [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        breadcrumb: 'Home',
        element: <Home />,
      },
      {
        path: '/example',
        breadcrumb: 'Example Page',
        element: <ExamplePage />,
      },
    ],
  },
];
