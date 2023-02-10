import { findByTitle, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithMainWrapper } from '__tests__/utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BeerList from 'src/pages/BeerList';
import userEvent from '@testing-library/user-event';
import beerListMock10 from '__mocks__/data/beerList10.json';

describe('BeerList Page', () => {
  const axiosMock = new MockAdapter(axios);
  
  it('peut naviguer de la page 1 à la page 2 tout en gardant les data en cache', async () => {
    // On prépare la réponse de la page 1 et 2
    const page1Response = jest.fn().mockReturnValue([200, [beerListMock10[0], beerListMock10[1]]]);
    const page2Response = jest.fn().mockReturnValue([200, [beerListMock10[2], beerListMock10[3]]]);
    // On mock la réponse de la page 1 et 2
    axiosMock.onGet('/beers?page=1&per_page=10').reply(page1Response);
    axiosMock.onGet('/beers?page=2&per_page=10').reply(page2Response);

    const { container } = renderWithMainWrapper(<BeerList />);

    // On vérifie que l'appel de la liste des bières est bien fait avec les paramètres par défaut
    expect(axiosMock.history.get[0].url).toBe('/beers?page=1&per_page=10');

    // On attend que le premier chargement soit terminé
    await waitForElementToBeRemoved(() => container.querySelector('.ant-spin-dot-spin'));

    // Puis on vérifie bien que l'appel de la page 1 est bien fait
    expect(page1Response).toHaveBeenCalledTimes(1);

    // Petit fix de soucis de ant design due au loading qui vient se placer sur le composant de pagination
    container.querySelector('.ant-pagination').style.pointerEvents = 'auto';

    // On clique sur le lien de la page 2
    await waitFor(() => userEvent.click(screen.getByTitle(2).querySelector('a')));

    // On vérifie que l'appel de la page 2 a bien été fait
    expect(page2Response).toHaveBeenCalledTimes(1);

    // On nettoie le nombre d'appel de la page 1 pour tester qu'il n'a pas été rappelé en renavigant sur la page 1
    page1Response.mockClear();

    // On revient ensuite sur la page 1
    await waitFor(() => userEvent.click(screen.getByTitle(1).querySelector('a')));

    // Et on vérifie qu'il n'a pas été appelé ( du au cache de react-query )
    expect(page1Response).toHaveBeenCalledTimes(0);
  });

  it('peut changer le nombre de bières par page', async () => {
    const beer10Response = jest.fn().mockReturnValue([200, beerListMock10]);
    axiosMock.onGet('/beers?page=1&per_page=10').reply(beer10Response);

    const { container } = renderWithMainWrapper(<BeerList />);
    
    // On attend que le premier chargement soit terminé
    await waitForElementToBeRemoved(() => container.querySelector('.ant-spin-dot-spin'));

    // On vérifie que le nombre de bières affichées est bien de 10 ( par défaut )
    expect(container.querySelectorAll('.ant-table-row').length).toBe(10);
    
    // On récupère le selecteur de la page size
    const selectPageSize = container.querySelector('.ant-pagination-options');

    // On vérifie que le selecteur est bien présent
    expect(selectPageSize).toBeInTheDocument();
  });

  it('peut ouvrir le drawer en cliquant sur un bouton de détail', async () => {
    axiosMock.reset();
    const beer10Response = jest.fn().mockReturnValue([200, beerListMock10]);
    const beerID1Response = jest.fn().mockReturnValue([200, [beerListMock10[0]]]);
    axiosMock.onGet('/beers?page=1&per_page=10').reply(beer10Response);
    axiosMock.onGet('/beers/1').reply(beerID1Response);

    const { container } = renderWithMainWrapper(<BeerList />);
    
    // On attend que le premier chargement soit terminé
    await waitForElementToBeRemoved(() => container.querySelector('.ant-spin-dot-spin'));
    
    // On récupère le selecteur de la page size
    const firstTableRow = container.querySelector('[data-row-key="1"]');

    // On vérifie que la ligne est bien présente
    expect(firstTableRow).toBeInTheDocument();

    // Puis que le bouton est bien présent dans la ligne
    const buttonDetail = container.querySelector('[data-row-key="1"] .ant-btn');

    expect(buttonDetail).toBeInTheDocument();

    // On clique sur le bouton
    await waitFor(() => userEvent.click(buttonDetail));

    await waitFor(() => expect(screen.getByText(new RegExp(`Détail de la ${beerListMock10[0].name}`))).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('notFavorite')).toBeInTheDocument());
  });
});
