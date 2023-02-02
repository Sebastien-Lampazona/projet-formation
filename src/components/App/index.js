import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';
import 'antd/dist/reset.css';

export default function App() {
  const router = useRoutes(routes);
  return router;
}
