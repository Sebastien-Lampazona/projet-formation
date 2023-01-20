import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { init as initSocket } from 'src/features/messages/messagesSlice';
import routes from 'src/routes';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSocket());
  }, []);
  
  const router = useRoutes(routes);
  return router;
}
