import { FC, memo, useMemo } from 'react';
import { format } from 'date-fns';
import { Bid } from '@/types';
import { formatCurrency } from '@/lib/helpers/formatCurrency';

interface Props {
  bid: Bid;
}

const BitItem: FC<Props> = memo(({ bid }) => {
  const bidInfo = useMemo(() => {
    let bgColor = '';
    let text = '';

    switch (bid.bidStatus) {
      case 'Accepted':
        bgColor = 'bg-green-200';
        text = 'Bid accepted';
        break;

      case 'AcceptedBelowReserve':
        bgColor = 'bg-amber-500';
        text = 'Reserve not met';
        break;

      case 'TooLow':
        bgColor = 'bg-red-200';
        text = 'Bid was too low';
        break;

      default:
        bgColor = 'bg-red-200';
        text = 'Bid placed after auction finished';
        break;
    }

    return { bgColor, text };
  }, [bid.bidStatus]);

  return (
    <div
      className={`border-gray-300 border-2 px-3 py-2 rounded-lg 
        flex justify-between items-center mb-2
        ${bidInfo.bgColor}
      `}
    >
      <div className="flex flex-col">
        <span>Bidder: {bid.bidder}</span>

        <span className="text-gray-700 text-sm">
          Time {format(new Date(bid.bidTime), 'dd MMM yyyy h:mm a')}
        </span>
      </div>

      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">${formatCurrency(bid.amount)}</div>

        <div className="flex flex-row items-center">
          <span>{bidInfo.text}</span>
        </div>
      </div>
    </div>
  );
});

BitItem.displayName = 'BitItem';

export default BitItem;
