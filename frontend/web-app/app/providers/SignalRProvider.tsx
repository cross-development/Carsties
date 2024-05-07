'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Bid } from '@/types';
import { useBidStore } from '@/hooks/useBidStore';
import { useAuctionStore } from '@/hooks/useAuctionStore';

interface Props {
  children: ReactNode;
}

const SignalRProvider: FC<Props> = ({ children }) => {
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
          });
        })
        .catch(console.log);
    }

    return () => {
      connection?.stop();
    };
  }, [connection, setCurrentPrice]);

  return children;
};

SignalRProvider.displayName = 'SignalRProvider';

export default SignalRProvider;
