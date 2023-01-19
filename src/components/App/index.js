import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { initSocketAction } from 'src/actions';
import routes from 'src/routes';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSocketAction());
  }, []);
  const router = useRoutes(routes);
  return router;
}
