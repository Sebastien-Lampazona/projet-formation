import App from 'src/components/App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

it('render "Chat" in home Page', () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Chat/i);

  expect(linkElement).toBeInTheDocument();
});
