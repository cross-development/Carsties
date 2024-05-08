'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import AuctionFinishedToast from '../components/AuctionFinishedToast';
import { getDetailedViewData } from '../actions/auctionActions';
import { Auction, AuctionFinished, Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import { useAuctionStore } from '@/hooks/useAuctionStore';

interface Props {
  user: User | null;
  children: ReactNode;
}

const SignalRProvider: FC<Props> = ({ children, user }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const addBid = useBidStore(state => state.addBid);
  const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:6001/notifications')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to notification hub');

          connection.on('BidPlaced', (bid: Bid) => {
            if (bid.bidStatus.includes('Accepted')) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }

            addBid(bid);
          });

          connection.on('AuctionCreated', (auction: Auction) => {
            if (user?.username !== auction.seller) {
              return toast(<AuctionCreatedToast auction={auction} />, { duration: 10_000 });
            }
          });

          connection.on('AuctionFinished', (finishedAuction: AuctionFinished) => {
            const auction = getDetailedViewData(finishedAuction.auctionId);

            return toast.promise(
              auction,
              {
                loading: 'Loading',
                success: auction => (
                  <AuctionFinishedToast
                    auction={auction}
                    finishedAuction={finishedAuction}
                  />
                ),
                error: () => 'Auction finished!',
              },
              { success: { duration: 10_000, icon: null } },
            );
          });
        })
        .catch(console.log);
    }

    return () => {
      connection?.stop();
    };
  }, [addBid, connection, setCurrentPrice, user?.username]);

  return children;
};

SignalRProvider.displayName = 'SignalRProvider';

export default SignalRProvider;
