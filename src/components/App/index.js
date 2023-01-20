import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { initSocket } from 'src/actions/socket';
import routes from 'src/routes';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initSocket());
  }, []);

  const router = useRoutes(routes);
  return router;
}
