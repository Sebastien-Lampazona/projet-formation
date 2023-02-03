import React, { useRef, useCallback } from 'react';
import { useQuery } from 'react-query';
import BeerTable from './components/BeerTable';
import ApiCaller from 'src/commons/ApiCaller';
import { useSearchParams } from "react-router-dom";


import './styles.scss';
import BeerDetailDrawer from './components/BeerDetailDrawer/index';

function BeerList() {

  let [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    per_page: 10,
  });
  const beerDetailDrawerRef = useRef(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error
  } = useQuery(['beers', Object.fromEntries(searchParams)], () =>
    ApiCaller.makeRequest('GET', `/beers?page=${searchParams.get('page')}&per_page=${searchParams.get('per_page')}&beer_name=${searchParams.get('beer_name')}`),
    {
      keepPreviousData: true,
    });

    const showBeerDetail = useCallback((id) => {
      beerDetailDrawerRef.current.open(id, [data.find((beer) => beer.id === id)]);
    }, [data]);

  const onTableChangeParams = useCallback((pagination, filters, sorter) => {
    searchParams.set('page', pagination.current);
    searchParams.set('per_page', pagination.pageSize);

    Object.keys(filters).forEach((key) => {
      if (filters[key].length) {
        searchParams.set(key, filters[key]);
      } else {
        searchParams.delete(key);
      }
    });
    setSearchParams(searchParams);
  }, [searchParams]);

  return (
    <div className="beerlist-container">
      <main>
        <h2>Hello BeerList</h2>

        <BeerTable
          beers={data}
          loading={isLoading}
          onBeerDetail={showBeerDetail}
          searchParams={searchParams}
          page={Number(searchParams.get('page'))}
          pageSize={Number(searchParams.get('per_page'))}
          onChange={onTableChangeParams}
        />

        <BeerDetailDrawer ref={beerDetailDrawerRef} />

      </main>
    </div>
  );
}
export default BeerList;
