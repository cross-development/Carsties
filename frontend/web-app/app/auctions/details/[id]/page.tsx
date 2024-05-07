import { FC } from 'react';
import BidList from './BidList';
import EditButton from './EditButton';
import CarImage from '../../CarImage';
import DeleteButton from './DeleteButton';
import DetailedSpecs from './DetailedSpecs';
import CountdownTimer from '../../CountdownTimer';
import Heading from '@/app/components/Heading';
import { getCurrentUser } from '@/app/actions/authActions';
import { getDetailedViewData } from '@/app/actions/auctionActions';

interface Props {
  params: {
    id: string;
  };
}

const Details: FC<Props> = async ({ params }) => {
  const auction = await getDetailedViewData(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${auction.make} ${auction.model}`} />

          {user?.username === auction.seller && (
            <>
              <EditButton id={auction.id} />

              <DeleteButton id={auction.id} />
            </>
          )}
        </div>

        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>

          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CarImage imageUrl={auction.imageUrl} />
        </div>

        <BidList
          user={user}
          auction={auction}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={auction} />
      </div>
    </div>
  );
};

Details.displayName = 'Details';

export default Details;
