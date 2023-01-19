import Home from 'src/pages/Home';
import { render, screen, waitFor } from '@testing-library/react';
import store from 'src/store';
import { Provider } from 'react-redux';

it('render "Chat" in home Page', async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  await waitFor(() => expect(screen.getByText(/Chat/i)).toBeInTheDocument());
});
