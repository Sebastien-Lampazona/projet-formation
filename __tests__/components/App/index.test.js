import App from 'src/components/App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

it('render "TODO List" in home Page', () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/TODO List/i);

  expect(linkElement).toBeInTheDocument();
});
