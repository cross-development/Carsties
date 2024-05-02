'use client';

import { FC, memo } from 'react';
import { Pagination } from 'flowbite-react';

interface Props {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

const AppPagination: FC<Props> = memo(({ currentPage, pageCount, onChangePage }) => (
  <Pagination
    showIcons
    layout="pagination"
    totalPages={pageCount}
    currentPage={currentPage}
    onPageChange={onChangePage}
    className="text-blue-500 mb-5"
  />
));

AppPagination.displayName = 'AppPagination';

export default AppPagination;
