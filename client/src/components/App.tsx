import { useEffect, useState } from 'react';
import './App.css';
import { searchRestaurants } from '../api/searchRestaurants';
import { TRestaurant } from '../api/types';
import { Header } from './Header';
import { RestaurantItem } from './RestaurantItem';
import { Map } from './Map';
import { RestaurantContext } from '../context/RestaurantContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { View } from '../types/View';
import cx from 'classnames';
import { ToggleView } from './ToggleView';
import * as R from 'ramda';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
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
  const [view, setView] = useState<View>(View.List);

  useEffect(() => {
    setLoading(true);
    const debounceTimer = setTimeout(async () => {
      await searchRestaurants(searchTerm).then(setRestaurants).catch(setError);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (error) {
    return <ErrorFallback error={error} />;
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
        <div className="App bg-gray h-screen font-manrope relative">
          <Header loading={loading} onSearch={setSearchTerm} />

          {restaurants && (
            <div className="w-screen flex h-[calc(100vh-7rem)] lg:h-[calc(100vh-64px)]">
              <div
                className={cx(
                  view === View.List
                    ? 'w-full lg:w-5/12'
                    : 'hidden lg:w-5/12	 lg:block',
                  'overflow-auto h-full bg-gray'
                )}
              >
                {restaurants.map((restaurant) => (
                  <RestaurantItem
                    key={restaurant.place_id}
                    restaurant={restaurant}
                  />
                ))}
              </div>

              <div
                className={cx(
                  view === View.Map ? 'w-full' : 'hidden lg:block w-full'
                )}
              >
                <Map restaurants={restaurants} />
              </div>

              <ToggleView view={view} toggleView={setView} />
            </div>
          )}
        </div>
      </RestaurantContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
