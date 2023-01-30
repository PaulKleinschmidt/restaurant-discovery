import { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { default as logo } from '../assets/logo.svg';
import { default as search } from '../assets/search.svg';

type Props = {
  onSearch(query: string): void;
  loading: boolean;
};

export const Header = ({ onSearch, loading }: Props) => (
  <div className="flex w-full bg-white h-16 justify-between py-4 px-6">
    <img src={logo} alt="logo" />

    <div className="flex my-auto">
      {loading && (
        <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-green border-t-transparent my-auto mx-4" />
      )}

      <div className="flex bg-gray h-8 my-auto rounded-4xl w-96 p-[6px]">
        <img src={search} className="px-4" alt="search-icon" />

        <input
          placeholder="Search restaurants"
          className="border-none w-full bg-gray rounded-r-4xl"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </div>
);
