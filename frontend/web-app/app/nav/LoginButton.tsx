'use client';

import { FC, memo } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from 'flowbite-react';

const LoginButton: FC = memo(() => {
  const handleLogin = () => signIn('id-server', { callbackUrl: '/' });

  return (
    <Button
      outline
      onClick={handleLogin}
    >
      Login
    </Button>
  );
});

LoginButton.displayName = 'LoginButton';

export default LoginButton;
