import { FC } from 'react';
import AuctionForm from '../../AuctionForm';
import Heading from '@/app/components/Heading';
import { getDetailedViewData } from '@/app/actions/auctionActions';

interface Props {
  params: { id: string };
}

const Update: FC<Props> = async ({ params }) => {
  const auction = await getDetailedViewData(params.id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />

      <AuctionForm auction={auction} />
    </div>
  );
};

Update.displayName = 'Update';

export default Update;
