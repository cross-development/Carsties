'use client';

import { memo, useEffect, useState, FC } from 'react';
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import { Auction } from '@/types';
import Filters from './Filters';

const Listings: FC = memo(() => {
  const [pageSize, setPageSize] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    getData(pageNumber, pageSize).then((data): void => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    });
  }, [pageNumber, pageSize]);

  if (auctions.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Filters
        pageSize={pageSize}
        onSetPageSize={setPageSize}
      />

      <div className="grid grid-cols-4 gap-6">
        {auctions.map(auction => (
          <AuctionCard
            key={auction.id}
            auction={auction}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={1}
          pageCount={pageCount}
          onChangePage={setPageNumber}
        />
      </div>
    </>
  );
});

Listings.displayName = 'Listings';

export default Listings;
