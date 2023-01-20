import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import * as sockets from 'src/features/sockets';
import routes from 'src/routes';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sockets.init());
  }, []);

  const router = useRoutes(routes);
  return router;
}
