'use client';

import { FC, memo } from 'react';
import Link from 'next/link';
import { Button } from 'flowbite-react';

const UserActions: FC = memo(() => {
  return (
    <Button outline>
      <Link href="/session">Session</Link>
    </Button>
  );
});

UserActions.displayName = 'UserActions';

export default UserActions;
