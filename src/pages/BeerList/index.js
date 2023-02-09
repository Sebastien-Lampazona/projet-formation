import React, { useRef, useCallback, useEffect } from 'react';
import './styles.scss';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import ApiCaller from 'src/commons/ApiCaller';
import BeerTable from 'src/pages/BeerList/components/BeerTable';
import { useError } from 'src/commons/MessagesProvider';
import BeerDetailDrawer from 'src/pages/BeerList/BeerDetailDrawer';

function BeerList() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1, per_page: 10 });
  const beerDetailDrawerRef = useRef(null);
  const showError = useError();

  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
  } = useQuery(['beers', Object.fromEntries(searchParams)], () => ApiCaller.makeRequest('GET', `/beers?${searchParams.toString()}`), {
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute
  });

  const setPage = useCallback((page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }, [searchParams]);

  const setPerPage = useCallback((perPage) => {
    searchParams.set('per_page', perPage);
    setSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      showError(error);
    }
  }, [isError, error]);

  return (
    <div className="beerlist-container">
      <main>
        <h2>BeerList</h2>
        <BeerTable
          data={data}
          loading={isLoading}
          page={Number(searchParams.get('page'))}
          perPage={Number(searchParams.get('per_page'))}
          onBeerDetail={(beerID) => {
            beerDetailDrawerRef.current.openDrawer(beerID, data.find((beer) => beer.id === beerID));
          }}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
          fetching={isFetching}
          onChange={(pagination, filters) => {
            let newPage = pagination.current;
            if (searchParams.get('page') === pagination.current) {
              newPage = 1;
            }
            return setSearchParams({ ...filters, page: newPage, per_page: pagination.pageSize });
          }}
          searchParams={searchParams}
        />
        <BeerDetailDrawer ref={beerDetailDrawerRef} />
      </main>
    </div>
  );
}
export default BeerList;
