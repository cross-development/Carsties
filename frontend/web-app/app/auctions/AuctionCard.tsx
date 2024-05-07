import { memo, FC } from 'react';
import Link from 'next/link';
import CarImage from './CarImage';
import CurrentBit from './CurrentBit';
import CountdownTimer from './CountdownTimer';
import { Auction } from '@/types';

interface Props {
  auction: Auction;
}

const AuctionCard: FC<Props> = memo(({ auction }) => (
  <Link
    href={`/auctions/details/${auction.id}`}
    className="group"
  >
    <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
      <div>
        <CarImage imageUrl={auction.imageUrl} />

        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>

        <div className="absolute top-2 right-2">
          <CurrentBit
            amount={auction.currentHighBid}
            reservePrice={auction.reservePrice}
          />
        </div>
      </div>
    </div>

    <div className="flex justify-between items-center mt-4">
      <h3 className="text-gray-700">
        {auction.make} {auction.model}
      </h3>

      <p className="font-semibold text-sm">{auction.year}</p>
    </div>
  </Link>
));

AuctionCard.displayName = 'AuctionCard';

export default AuctionCard;
