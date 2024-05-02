import { FC, memo } from 'react';
import { Button, ButtonGroup } from 'flowbite-react';
import { useParamsStore } from '@/hooks/useParamsStore';

const pageSizeButtons = [4, 8, 12];

const Filters: FC = memo(() => {
  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>

        <ButtonGroup>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              color={pageSize === value ? 'red' : 'gray'}
              onClick={() => setParams({ pageSize: value })}
              className="focus:ring-0"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
});

Filters.displayName = 'Filters';

export default Filters;
