import { render, screen } from '@testing-library/react';
import Header from 'src/pages/BeerList/BeerDetailDrawer/components/Header';
import beerListMock10 from '__mocks__/data/beerList10.json';

describe('BeerDetailDrawer Header', () => {
  it('doit affiche un loader si loading est vrai et pas d\'image', async () => {
    const { container } = render(<Header beerData={beerListMock10[0]} loading />);

    expect(container.querySelector('.ant-skeleton')).toBeInTheDocument();

    expect(screen.queryByTestId('beerDetailDrawerHeader-image')).not.toBeInTheDocument();
  });

  it('doit afficher un titre une image et une description si il n\'est pas en loading', async () => {
    render(<Header beerData={beerListMock10[0]} />);

    expect(screen.queryByTestId('beerDetailDrawerHeader-image')).toBeInTheDocument();
    expect(screen.queryByTestId('beerDetailDrawerHeader-abv')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.queryByTestId('beerDetailDrawerHeader-tagline')).toBeInTheDocument();
    expect(screen.queryByTestId('beerDetailDrawerHeader-description')).toBeInTheDocument();
  });
});
