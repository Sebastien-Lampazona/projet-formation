import { render, screen } from '@testing-library/react';
import beerList10 from '__mocks__/data/beerList10';
import Header from 'src/pages/BeerList/BeerDetailDrawer/components/Header';

describe('Header BeerDetailDrawer Component', () => {
  it('affiche une image, un titre, un sous titre et une description', () => {
    render(<Header beerData={beerList10[0]} />);

    // On vérifie que l'image est affichée
    expect(screen.queryByAltText('beer-photo')).toBeInTheDocument();
    // On vérifie que le degrès d'alcool est affiché
    expect(screen.queryByTestId('beerDetailDrawerHeader-abv')).toBeInTheDocument();
    // On vérifie que le titre est affiché
    expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
    // On vérifie que le sous titre est affiché
    expect(screen.queryByTestId('beerDetailDrawerHeader-tagline')).toBeInTheDocument();
    // On vérifie que la description est affichée
    expect(screen.queryByTestId('beerDetailDrawerHeader-description')).toBeInTheDocument();
  });
});
