import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import Navbar from './nav/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carsties',
  description: 'Carsties auction with microservices',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="container mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
