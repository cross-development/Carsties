'use client';

import { memo, useEffect, useState, FC, useCallback } from 'react';
import qs from 'query-string';
import Filters from './Filters';
import AuctionCard from './AuctionCard';
import EmptyFilter from '../components/EmptyFilter';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import { Auction, PagedResult } from '@/types';
import { useParamsStore } from '@/hooks/useParamsStore';

const Listings: FC = memo(() => {
  const [data, setData] = useState<PagedResult<Auction>>();

  const params = useParamsStore(state => ({
    pageSize: state.pageSize,
    pageNumber: state.pageNumber,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
  }));

  const setParams = useParamsStore(state => state.setParams);

  const url = qs.stringifyUrl({ url: '', query: params });

  const setPageNumber = useCallback(
    (pageNumber: number): void => setParams({ pageNumber }),
    [setParams],
  );

  useEffect(() => {
    getData(url).then(setData);
  }, [url]);

  if (!data) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Filters />

      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.results.map(auction => (
              <AuctionCard
                key={auction.id}
                auction={auction}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <AppPagination
              pageCount={data.pageCount}
              currentPage={params.pageNumber}
              onChangePage={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
});

Listings.displayName = 'Listings';

export default Listings;
