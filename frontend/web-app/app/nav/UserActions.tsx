'use client';

import { FC, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiUser } from 'react-icons/hi';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';
import { useParamsStore } from '@/hooks/useParamsStore';

interface Props {
  user: User;
}

const UserActions: FC<Props> = memo(({ user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const setParams = useParamsStore(state => state.setParams);

  const currentPathAndRedirectToHomePage = (): void => {
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const setWinner = (): void => {
    setParams({ winner: user?.username, seller: undefined });
    currentPathAndRedirectToHomePage();
  };

  const setSeller = (): void => {
    setParams({ seller: user?.username, winner: undefined });
    currentPathAndRedirectToHomePage();
  };

  const handleLogout = (): void => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Dropdown
      inline
      label={`Welcome ${user?.name}`}
    >
      <Dropdown.Item
        icon={HiUser}
        onClick={setSeller}
      >
        <Link href="/">My auctions</Link>
      </Dropdown.Item>

      <Dropdown.Item
        icon={AiFillTrophy}
        onClick={setWinner}
      >
        <Link href="/">Auctions won</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell my car</Link>
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
