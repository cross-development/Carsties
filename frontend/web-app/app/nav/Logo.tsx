'use client';

import { FC, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineCar } from 'react-icons/ai';
import { useParamsStore } from '@/hooks/useParamsStore';

const Logo: FC = memo(() => {
  const router = useRouter();
  const pathname = usePathname();

  const reset = useParamsStore(state => state.reset);

  const handleReset = (): void => {
    if (pathname !== '/') {
      router.push('/');
    }

    reset();
  };

  return (
    <div
      onClick={handleReset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <AiOutlineCar size={34} />

      <div>Carsties Auctions</div>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
