'use client';

import { FC, memo } from 'react';
import Link from 'next/link';
import { Button } from 'flowbite-react';

interface Props {
  id: string;
}

const EditButton: FC<Props> = memo(({ id }) => (
  <Button outline>
    <Link href={`/auctions/update/${id}`}>Update Auction</Link>
  </Button>
));

EditButton.displayName = 'EditButton';

export default EditButton;
