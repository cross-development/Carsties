import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carsties',
  description: 'Carsties auction with microservices',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en">
    <body>
      <ToasterProvider />

      <Navbar />

      <main className="container mx-auto px-5 pt-10">{children}</main>
    </body>
  </html>
);

RootLayout.displayName = 'RootLayout';

export default RootLayout;
