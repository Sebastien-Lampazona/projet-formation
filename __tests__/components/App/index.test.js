import App from 'src/components/App';
import { render, screen } from '@testing-library/react';

describe('App Component', () => {
  it.skip('affiche "BeerList" sur la page d\'accueil', () => {
    render(<App />);
    const linkElement = screen.getByText(/BeerList/i);

    expect(linkElement).toBeInTheDocument();
  });
});
