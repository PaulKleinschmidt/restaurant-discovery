import React, { useEffect, useState } from 'react';
import './App.css';
import { searchRestaurants } from '../api/searchRestaurants';
import { Restaurant, RestaurantResults } from '../api/types';
import { Header } from './Header';
import { RestaurantItem } from './RestaurantItem';
import { Map } from './Map';
import { RestaurantContext } from '../context/RestaurantContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<RestaurantResults | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const onSearch = async (query: string) => {
    setLoading(true);
    await searchRestaurants(query).then(setRestaurants).catch(setError);
    setLoading(false);
  };

  useEffect(() => {
    onSearch('');
  }, []);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <RestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant }}
    >
      <div className="App bg-gray h-screen">
        <Header onSearch={onSearch} />

        {loading && !restaurants && <div>Loading...</div>}

        {restaurants && (
          <div className="flex">
            <div className="w-4/12 overflow-auto h-[calc(100vh-64px)] bg-gray">
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.place_id}
                  restaurant={restaurant}
                />
              ))}
            </div>
            <div className="w-full">
              <Map restaurants={restaurants} />
            </div>
          </div>
        )}
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
