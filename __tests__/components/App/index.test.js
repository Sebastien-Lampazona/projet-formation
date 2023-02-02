import App from 'src/components/App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

it.skip('render "BeerList" in home Page', () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/BeerList/i);

  expect(linkElement).toBeInTheDocument();
});
