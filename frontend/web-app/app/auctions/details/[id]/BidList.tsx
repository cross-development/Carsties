'use client';

import { FC, memo, useState, useEffect, useMemo } from 'react';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import BitItem from './BitItem';
import { Auction, Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import Heading from '@/app/components/Heading';
import { getBidsForAuction } from '@/app/actions/auctionActions';
import NoData from '@/app/components/NoData';
import BidForm from './BidForm';

interface Props {
  user: User | null;
  auction: Auction;
}

const BidList: FC<Props> = memo(({ user, auction }) => {
  const [loading, setLoading] = useState(true);

  const bids = useBidStore(state => state.bids);
  const setBids = useBidStore(state => state.setBids);

  const highBid = useMemo(
    () => bids.reduce((prev, current) => (prev > current.amount ? prev : current.amount), 0),
    [bids],
  );

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }

        setBids(res as Bid[]);
      })
      .catch(error => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [auction.id, setBids]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading title={`Current high bid is $${highBid}`} />
        </div>
      </div>

      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {!bids.length ? (
          <NoData
            title="No bids for this item"
            subtitle="Please feel free to make a bid"
          />
        ) : (
          bids.map(bid => (
            <BitItem
              key={bid.id}
              bid={bid}
            />
          ))
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        <BidForm
          highBid={highBid}
          auctionId={auction.id}
        />
      </div>
    </div>
  );
});

BidList.displayName = 'BidList';

export default BidList;
