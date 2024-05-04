'use client';

import { FC, useState } from 'react';
import { Button } from 'flowbite-react';
import { updateAuctionTest } from '../actions/auctionActions';

const AuthTest: FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>();

  const handleUpdate = (): void => {
    setResult(undefined);
    setLoading(true);

    updateAuctionTest()
      .then(setResult)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        outline
        isProcessing={loading}
        onClick={handleUpdate}
      >
        Test auth
      </Button>

      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
};

AuthTest.displayName = 'AuthTest';

export default AuthTest;
