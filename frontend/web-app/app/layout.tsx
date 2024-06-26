import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import SignalRProvider from './providers/SignalRProvider';
import { getCurrentUser } from './actions/authActions';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carsties',
  description: 'Carsties auction with microservices',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ToasterProvider />

        <Navbar />

        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
