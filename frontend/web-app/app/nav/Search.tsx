'use client';

import { ChangeEvent, FC, KeyboardEvent, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useParamsStore } from '@/hooks/useParamsStore';

const Search: FC = memo(() => {
  const router = useRouter();
  const pathname = usePathname();

  const searchValue = useParamsStore(state => state.searchValue);
  const setParams = useParamsStore(state => state.setParams);
  const setSearchValue = useParamsStore(state => state.setSearchValue);
  const reset = useParamsStore(state => state.reset);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (): void => {
    if (pathname !== '/') {
      router.push('/');
    }

    setParams({ searchTerm: searchValue });
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;

    handleSearch();
  };

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for cars by make, mode, or color"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleInputKeyDown}
        className="flex-grow pl-5 bg-transparent border-transparent text-sm text-gray-600
                   focus:outline-none focus:border-transparent focus:ring-0"
      />

      {searchValue && (
        <button onClick={reset}>
          <FaTimes
            size={34}
            className="bg-gray-300 text-gray-700 rounded-full p-2 cursor-pointer ml-2"
          />
        </button>
      )}

      <button onClick={handleSearch}>
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
