import { FC, memo } from 'react';
import { Button } from 'flowbite-react';
import Heading from './Heading';
import { useParamsStore } from '@/hooks/useParamsStore';

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyFilter: FC<Props> = memo(props => {
  const {
    showReset,
    title = 'No matches for this filter',
    subtitle = 'Try changing or resetting the filter',
  } = props;

  const reset = useParamsStore(state => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />

      <div className="mt-4">
        {showReset && (
          <Button
            outline
            onClick={reset}
          >
            Remove Filters
          </Button>
        )}
      </div>
    </div>
  );
});

EmptyFilter.displayName = 'EmptyFilter';

export default EmptyFilter;
