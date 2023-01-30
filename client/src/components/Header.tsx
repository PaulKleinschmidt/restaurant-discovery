import { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { default as logo } from '../assets/logo.svg';
import { default as search } from '../assets/search.svg';

type Props = {
  onSearch(query: string): void;
};

export const Header = ({ onSearch }: Props) => {
  const debounceSearch = debounce(
    (e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
    500
  );
  return (
    <div className="flex w-full bg-white h-16 justify-between py-4 px-6">
      <img src={logo} alt="logo" />
      <div className="flex bg-gray h-8 my-auto rounded-4xl w-96 p-[6px]">
        <img src={search} className="px-4" alt="search-icon" />

        <input
          placeholder="Search restaurants"
          className="border-none w-full bg-gray rounded-r-4xl"
          onChange={debounceSearch}
        />
      </div>
    </div>
  );
};
