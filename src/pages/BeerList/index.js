import React, { useRef, useState } from 'react';
import './styles.scss';
import { useQuery } from 'react-query';
import { useSearchParams } from "react-router-dom";
import ApiCaller from 'src/commons/ApiCaller';
import BeerTable from 'src/pages/BeerList/components/BeerTable';
import BeerDetailDrawer from './components/BeerDetailDrawer/index';

function BeerList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const beerDetailDrawerRef = useRef(null);

  const {
    data,
    error,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery(['beers', Object.fromEntries(searchParams)], () => ApiCaller.makeRequest('GET', `/beers?${searchParams.toString()}`), {
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <div className="beerlist-container">
      <main>
        <h2>BeerList</h2>
        <BeerTable
          data={data}
          loading={isLoading}
          page={page}
          perPage={perPage}
          onBeerDetail={(beerID) => {
            beerDetailDrawerRef.current.openDrawer(beerID);
          }}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
          fetching={isFetching}
          onChange={(pagination, filters) => {
            let newPage = pagination.current;
            if (page === pagination.current) {
              newPage = 1;
            }
            return setSearchParams({ ...filters, page: newPage, per_page: pagination.pageSize })
          }}
          searchParams={searchParams}
        />
        <BeerDetailDrawer ref={beerDetailDrawerRef}/>
      </main>
    </div>
  );
}
export default BeerList;
