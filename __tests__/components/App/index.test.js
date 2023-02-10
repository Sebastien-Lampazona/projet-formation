import App from 'src/components/App';
import { screen } from '@testing-library/react';
import { renderWithMainWrapper } from '__tests__/utils';

describe('App Component', () => {
  it('affiche "BeerList" sur la page d\'accueil', () => {
    renderWithMainWrapper(<App />);
    const linkElement = screen.getByText(/BeerList/i);

    expect(linkElement).toBeInTheDocument();
  });
});
