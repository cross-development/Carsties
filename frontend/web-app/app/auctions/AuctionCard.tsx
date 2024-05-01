import { memo, type FC } from 'react';
import CarImage from './CarImage';
import CountdownTimer from './CountdownTimer';
import { Auction } from '@/types';

interface Props {
  auction: Auction;
}

const AuctionCard: FC<Props> = memo(({ auction }) => {
  return (
    <a
      href="#"
      className="group"
    >
      <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
        <div>
          <CarImage imageUrl={auction.imageUrl} />

          <div className="absolute bottom-2 left-2">
            <CountdownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h3 className="text-gray-700">
            {auction.make} {auction.model}
          </h3>

          <p className="font-semibold text-sm">{auction.year}</p>
        </div>
      </div>
    </a>
  );
});

AuctionCard.displayName = 'AuctionCard';

export default AuctionCard;
