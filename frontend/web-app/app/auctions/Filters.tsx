import { FC, memo } from 'react';
import { Button, ButtonGroup } from 'flowbite-react';

const pageSizeButtons = [4, 8, 12];

interface Props {
  pageSize: number;
  onSetPageSize: (size: number) => void;
}

const Filters: FC<Props> = memo(({ pageSize, onSetPageSize }) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>

      <ButtonGroup>
        {pageSizeButtons.map((value, index) => (
          <Button
            key={index}
            color={pageSize === value ? 'red' : 'gray'}
            onClick={() => onSetPageSize(value)}
            className="focus:ring-0"
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  </div>
));

Filters.displayName = 'Filters';

export default Filters;
