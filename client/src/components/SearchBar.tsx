import { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

type Props = {
  onSearch(query: string): void;
};

export const SearchBar = ({ onSearch }: Props) => {
  const debounceSearch = debounce(
    (e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
    200
  );
  return <input onChange={debounceSearch} />;
};
