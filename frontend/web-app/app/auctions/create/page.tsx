import { FC } from 'react';
import AuctionForm from '../AuctionForm';
import Heading from '@/app/components/Heading';

const Create: FC = () => {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell your car!"
        subtitle="Please enter the details of your car"
      />

      <AuctionForm />
    </div>
  );
};

Create.displayName = 'Create';

export default Create;
