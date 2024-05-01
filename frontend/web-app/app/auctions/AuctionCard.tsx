import { memo, type FC } from 'react';
import Image from 'next/image';

interface Props {
  auction: any;
}

const AuctionCard: FC<Props> = memo(({ auction }) => {
  return (
    <a href="#">
      <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
        <div>
          <Image
            fill
            priority
            alt="image"
            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25 vw"
            src={auction.imageUrl}
            className="object-cover"
          />
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
