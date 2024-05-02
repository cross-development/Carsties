import { FC } from 'react';
import Listings from './auctions/Listings';

const Home: FC = () => (
  <div>
    <Listings />
  </div>
);

Home.displayName = 'Home';

export default Home;
