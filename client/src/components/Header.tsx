import { default as logo } from '../assets/logo.svg';
import { default as search } from '../assets/search.svg';

type Props = {
  onSearch(query: string): void;
  loading: boolean;
};

export const Header = ({ onSearch, loading }: Props) => (
  <div className="block md:flex w-full bg-white justify-between py-4 px-6 h-28 md:h-16">
    <img src={logo} alt="logo" className="mx-auto my-1 md:mx-0 md:my-0" />

    <div className="flex my-auto mx-auto md:mx-0 relative">
      {loading && (
        <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-green border-t-transparent my-auto mx-4 absolute top-4 md:top-2 left-2" />
      )}

      <div className="flex bg-gray h-8 my-auto rounded-4xl w-full md:w-96 p-[6px] mt-2 md:mt-0">
        {loading ? (
          <span className="w-16	px-4" />
        ) : (
          <img src={search} className="px-4 w-16" alt="search-icon" />
        )}

        <input
          placeholder="Search restaurants"
          className="border-none w-full bg-gray rounded-r-4xl"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </div>
);
