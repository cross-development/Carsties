import { FC, memo } from 'react';

interface Props {
  title: string;
  subtitle: string;
  center?: boolean;
}

const Heading: FC<Props> = memo(({ title, subtitle, center }) => (
  <div className={center ? 'text-center' : 'text-start'}>
    <div className="text-2xl font-bold">{title}</div>

    <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
  </div>
));

Heading.displayName = 'Heading';

export default Heading;
