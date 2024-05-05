import { FC } from 'react';

interface Props {
  params: { id: string };
}

const Update: FC<Props> = ({ params }) => {
  return <div>Update</div>;
};

Update.displayName = 'Update';

export default Update;
