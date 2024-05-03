import { FC, memo } from 'react';
import { Button, ButtonGroup } from 'flowbite-react';
import { useParamsStore } from '@/hooks/useParamsStore';
import * as filterSettings from '@/helpers/filterSettings';

const Filters: FC = memo(() => {
  const orderBy = useParamsStore(state => state.orderBy);
  const filterBy = useParamsStore(state => state.filterBy);
  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Filter by</span>

        <ButtonGroup>
          {filterSettings.filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              color={filterBy === value ? 'red' : 'gray'}
              onClick={() => setParams({ filterBy: value })}
              className="focus:ring-0"
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>

        <ButtonGroup>
          {filterSettings.orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              color={orderBy === value ? 'red' : 'gray'}
              onClick={() => setParams({ orderBy: value })}
              className="focus:ring-0"
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>

        <ButtonGroup>
          {filterSettings.pageSizeButtons.map((value, index) => (
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
