'use client';

import { FC, memo } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from 'flowbite-react';
import Heading from './Heading';
import { useParamsStore } from '@/hooks/useParamsStore';

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
}

const NoData: FC<Props> = memo(props => {
  const {
    showReset,
    showLogin,
    callbackUrl,
    title = 'No matches for this filter',
    subtitle = 'Try changing or resetting the filter',
  } = props;

  const reset = useParamsStore(state => state.reset);

  const handleLogin = (): void => {
    signIn('id-server', { callbackUrl });
  };

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />

      <div className="mt-4">
        {showReset && (
          <Button
            outline
            onClick={reset}
          >
            Remove Filters
          </Button>
        )}

        {showLogin && (
          <Button
            outline
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
});

NoData.displayName = 'NoData';

export default NoData;
