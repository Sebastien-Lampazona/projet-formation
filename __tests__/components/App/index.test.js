import { screen } from '@testing-library/react';
import App from 'src/components/App';
import { renderWithProviders } from '__tests__/utils';

describe('App Component', () => {
  it('affiche "BeerList" sur la page d\'accueil', () => {
    const { asFragment} = renderWithProviders(<App />);
    const linkElement = screen.getByText(/BeerList/i);

    expect(asFragment()).toMatchSnapshot();
    expect(linkElement).toBeInTheDocument();
  });
});
