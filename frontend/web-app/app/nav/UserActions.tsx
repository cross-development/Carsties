'use client';

import { FC, memo } from 'react';
import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiUser } from 'react-icons/hi';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';

interface Props {
  user: Partial<User>;
}

const UserActions: FC<Props> = memo(({ user }) => {
  const handleLogout = () => signOut({ callbackUrl: '/' });

  return (
    <Dropdown
      inline
      label={`Welcome ${user.name}`}
    >
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My auctions</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={handleLogout}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
});

UserActions.displayName = 'UserActions';

export default UserActions;
