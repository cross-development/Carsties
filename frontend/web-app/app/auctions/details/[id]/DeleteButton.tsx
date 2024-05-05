'use client';

import { FC, memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';
import { deleteAuction } from '@/app/actions/auctionActions';

interface Props {
  id: string;
}

const DeleteButton: FC<Props> = memo(({ id }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDeleteAuction = (): void => {
    setLoading(true);

    deleteAuction(id)
      .then(res => {
        if (res.error) {
          throw res.error;
        }

        router.push('/');
      })
      .catch(error => toast.error(`${error.status} ${error.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <Button
      color="failure"
      disabled={loading}
      isProcessing={loading}
      onClick={handleDeleteAuction}
    >
      Delete Auction
    </Button>
  );
});

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
