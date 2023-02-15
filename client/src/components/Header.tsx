import { default as search } from '../assets/search.svg';
import { TLoadingState } from '../types/LoadingState';

type TProps = {
  onSearch(): void;
  updateSearchTerm(query: string): void;
  loadingState: TLoadingState;
};

export const Header = ({
  onSearch,
  loadingState,
  updateSearchTerm,
}: TProps) => (
  <div className="block lg:flex w-full bg-white justify-between py-4 px-6 h-28 lg:h-16 border-b-gray2 border-b-2">
    <h2 className="text-3xl font-bold">Restaurant Discovery</h2>
    <div className="flex my-auto mx-auto lg:mx-0 relative">
      {loadingState.searchTerm && (
        <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-green border-t-transparent my-auto mx-4 absolute top-4 lg:top-2 left-2" />
      )}
      <form
        className="flex bg-gray h-8 my-auto rounded-4xl w-full lg:w-96 p-[6px] mt-2 lg:mt-0"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        {loadingState.searchTerm ? (
          <span className="w-14	px-4" />
        ) : (
          <button className="px-4 w-14" type="submit">
            <img onClick={onSearch} src={search} alt="search-icon" />
          </button>
        )}
        <input
          disabled={loadingState.searchLocation || loadingState.searchTerm}
          placeholder="Search restaurants"
          className="border-none w-full bg-gray rounded-r-4xl"
          onChange={(e) => updateSearchTerm(e.target.value)}
        />
      </form>
    </div>
  </div>
);
