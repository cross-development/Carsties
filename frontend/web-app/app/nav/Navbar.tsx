import { memo, FC } from 'react';
import Logo from './Logo';
import Search from './Search';
import LoginButton from './LoginButton';
import UserActions from './UserActions';
import { getCurrentUser } from '../actions/authActions';

const Navbar: FC = memo(async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <Logo />

      <Search />

      {user ? <UserActions /> : <LoginButton />}
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
