'use client';

import { FC, memo, useState, useEffect, useMemo } from 'react';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import BitItem from './BitItem';
import BidForm from './BidForm';
import { Auction, Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import NoData from '@/app/components/NoData';
import Heading from '@/app/components/Heading';
import { getBidsForAuction } from '@/app/actions/auctionActions';

interface Props {
  user: User | null;
  auction: Auction;
}

const BidList: FC<Props> = memo(({ user, auction }) => {
  const [loading, setLoading] = useState(true);

  const bids = useBidStore(state => state.bids);
  const setBids = useBidStore(state => state.setBids);

  const open = useBidStore(state => state.open);
  const setOpen = useBidStore(state => state.setOpen);

  const openForBids = new Date(auction.auctionEnd) > new Date();

  const highBid = useMemo(
    () =>
      bids.reduce((prev, current) => {
        if (prev > current.amount) {
          return prev;
        }

        if (current.bidStatus.includes('Accepted')) {
          return current.amount;
        }

        return prev;
      }, 0),
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

  useEffect(() => {
    setOpen(openForBids);
  }, [openForBids, setOpen]);

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
        {!open ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            This auction has finished
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Please login to make a bid
          </div>
        ) : user && user.username === auction.seller ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Please login to make a bid
          </div>
        ) : (
          <BidForm
            highBid={highBid}
            auctionId={auction.id}
          />
        )}
      </div>
    </div>
  );
});

BidList.displayName = 'BidList';

export default BidList;
