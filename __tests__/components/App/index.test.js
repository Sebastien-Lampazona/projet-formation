import Home from 'src/pages/Home';
import { render, screen, waitFor } from '@testing-library/react';

it('render "Chat" in home Page', async () => {
  render(<Home />);

  await waitFor(() => expect(screen.getByText(/Chat/i)).toBeInTheDocument());
});
