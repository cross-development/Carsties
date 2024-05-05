import { FC } from 'react';

interface Props {
  params: { id: string };
}

const Details: FC<Props> = ({ params }) => {
  return <div>Details</div>;
};

Details.displayName = 'Details';

export default Details;
