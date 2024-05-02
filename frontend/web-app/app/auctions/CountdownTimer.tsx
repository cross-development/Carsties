'use client';

import { memo, FC } from 'react';
import Countdown, { zeroPad, CountdownRenderProps } from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => (
  <div
    className={`border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
        ${completed ? 'bg-red-600' : days === 0 && hours < 10 ? 'bg-amber-600' : 'bg-green-600'}`}
  >
    {completed ? (
      <span>Auction finished</span>
    ) : (
      <span suppressHydrationWarning>
        {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )}
  </div>
);

interface Props {
  auctionEnd: string;
}

const CountdownTimer: FC<Props> = memo(({ auctionEnd }) => (
  <div>
    <Countdown
      date={auctionEnd}
      renderer={renderer}
    />
  </div>
));

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;
