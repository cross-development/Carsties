'use client';

import { memo, useEffect, useState, FC, useCallback } from 'react';
import qs from 'query-string';
import Filters from './Filters';
import AuctionCard from './AuctionCard';
import NoData from '../components/NoData';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useAuctionStore } from '@/hooks/useAuctionStore';

const Listings: FC = memo(() => {
  const [loading, setLoading] = useState(true);

  const data = useAuctionStore(state => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount,
  }));

  const setData = useAuctionStore(state => state.setData);

  const params = useParamsStore(state => ({
    pageSize: state.pageSize,
    pageNumber: state.pageNumber,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner,
  }));

  const setParams = useParamsStore(state => state.setParams);

  const url = qs.stringifyUrl({ url: '', query: params });

  const setPageNumber = useCallback(
    (pageNumber: number): void => setParams({ pageNumber }),
    [setParams],
  );

  useEffect(() => {
    getData(url)
      .then(setData)
      .finally(() => setLoading(false));
  }, [setData, url]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Filters />

      {data.totalCount === 0 ? (
        <NoData showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.auctions.map(auction => (
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
