import { memo, type FC } from 'react';
import AuctionCard from './AuctionCard';

async function getData(): Promise<any> {
  const res = await fetch('http://localhost:6001/search');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Listings: FC = memo(async () => {
  const data = await getData();

  return (
    <div className="grid grid-cols-4 gap-6">
      {data &&
        data.results.map((auction: any) => (
          <AuctionCard
            key={auction.id}
            auction={auction}
          />
        ))}
    </div>
  );
});

Listings.displayName = 'Listings';

export default Listings;
