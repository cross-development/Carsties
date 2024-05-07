'use client';

import { FC, memo } from 'react';
import toast from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { useBidStore } from '@/hooks/useBidStore';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { placeBidForAuction } from '@/app/actions/auctionActions';

interface Props {
  auctionId: string;
  highBid: number;
}

const BidForm: FC<Props> = memo(({ auctionId, highBid }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addBid = useBidStore(state => state.addBid);

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      const bid = await placeBidForAuction(auctionId, +data.amount);

      if (bid.error) {
        throw bid.error;
      }

      addBid(bid);
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register('amount')}
        placeholder={`Enter you bid (minimum bid is $${formatCurrency(highBid + 1)})`}
        className="input-custom text-sm text-gray-600"
      />
    </form>
  );
});

BidForm.displayName = 'BidForm';

export default BidForm;
