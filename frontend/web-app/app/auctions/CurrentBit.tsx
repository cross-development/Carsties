import { FC, memo } from 'react';

interface Props {
  amount?: number;
  reservePrice: number;
}

const CurrentBit: FC<Props> = memo(({ reservePrice, amount }) => {
  const text = amount ? `$${amount}` : 'No bids';
  const color = amount ? (amount > reservePrice ? 'bg-green-600' : 'bg-amber-600') : 'bg-red-600';

  return (
    <div
      className={`border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center ${color}`}
    >
      {text}
    </div>
  );
});

CurrentBit.displayName = 'CurrentBit';

export default CurrentBit;
