import { FC } from 'react';
import NoData from '@/app/components/NoData';

interface Props {
  searchParams: { callbackUrl: string };
}

const SignIn: FC<Props> = ({ searchParams }) => (
  <NoData
    showLogin
    title="You need to be logged in to do that"
    subtitle="Please click below to sign in"
    callbackUrl={searchParams.callbackUrl}
  />
);

SignIn.displayName = 'SignIn';

export default SignIn;
