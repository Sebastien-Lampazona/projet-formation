import App from 'src/components/App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

it('render "Hello Home" in home Page', () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Hello Home/i);

  expect(linkElement).toBeInTheDocument();
});
