import { useEffect, useState } from 'react';
import { searchRestaurants } from '../api/searchRestaurants';
import { TRestaurant } from '../api/types';
import { Header } from './Header';
import { RestaurantItem } from './RestaurantItem';
import { Map } from './Map';
import { RestaurantContext } from '../context/RestaurantContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { MobileView } from '../types/MobileView';
import cx from 'classnames';
import { ToggleMobileView } from './ToggleMobileView';
import * as R from 'ramda';
import { NoResults } from './NoResults';
import { Loading } from './Loading';
import { LoadingState } from '../types/LoadingState';

function App() {
  /*
    There are two places where a loading animation can appear:
      1. On initial app load
      2. In the serach bar after updating the search term
      3. In the "Search this area" button after clicking it
  */
  const [loadingState, setLoadingState] = useState<LoadingState>({
    initial: true,
    searchTerm: false,
    searchLocation: false,
  });
  const [restaurants, setRestaurants] = useState<TRestaurant[] | null>(null);
  const [favorites, setFavorites] = useState<TRestaurant[]>(() => {
    const localStorageFavorites = localStorage.getItem('favorites');
    return R.isNil(localStorageFavorites)
      ? []
      : JSON.parse(localStorageFavorites);
  });
  const [error, setError] = useState<Error | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<TRestaurant | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileView, setMobileView] = useState<MobileView>(MobileView.List);
  const [searchArea, setSearchArea] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      await searchRestaurants(searchTerm, searchArea)
        .then(setRestaurants)
        .catch(setError);
      setLoadingState({
        searchTerm: false,
        searchLocation: false,
        initial: false,
      });
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchArea]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setLoadingState((prevState) => ({ ...prevState, searchTerm: true }));
  }, [searchTerm]);

  useEffect(() => {
    setLoadingState((prevState) => ({ ...prevState, searchLocation: true }));
  }, [searchArea]);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  if (loadingState.initial) {
    return <Loading />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RestaurantContext.Provider
        value={{
          selectedRestaurant,
          setSelectedRestaurant,
          favorites,
          setFavorites,
        }}
      >
        <div className="App bg-gray h-screen font-manrope relative text-center">
          <Header loading={loadingState.searchTerm} onSearch={setSearchTerm} />

          {restaurants && (
            <div className="w-screen flex h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)]">
              <div
                className={cx(
                  mobileView === MobileView.List
                    ? 'w-full lg:w-5/12'
                    : 'hidden lg:w-5/12	lg:block',
                  'overflow-auto h-full bg-gray'
                )}
              >
                {restaurants.length === 0 ? (
                  <NoResults />
                ) : (
                  restaurants.map((restaurant) => (
                    <RestaurantItem
                      key={restaurant.place_id}
                      restaurant={restaurant}
                    />
                  ))
                )}
              </div>

              <div
                className={cx(
                  mobileView === MobileView.Map
                    ? 'w-full'
                    : 'hidden lg:block w-full'
                )}
              >
                <Map
                  loading={loadingState.searchLocation}
                  restaurants={restaurants}
                  setSearchArea={setSearchArea}
                />
              </div>

              <ToggleMobileView
                mobileView={mobileView}
                setMobileView={setMobileView}
              />
            </div>
          )}
        </div>
      </RestaurantContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
