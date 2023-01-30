import React, { useEffect, useState } from 'react';
import './App.css';
import { searchRestaurants } from '../api/searchRestaurants';
import { RestaurantResults } from '../api/types';
import { Header } from './Header';
import { RestaurantItem } from './RestaurantItem';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<RestaurantResults>([]);
  const [error, setError] = useState<Error | undefined>(undefined);

  const onSearch = async (query: string) => {
    setLoading(true);
    await searchRestaurants(query).then(setRestaurants).catch(setError);
    setLoading(false);
  };

  useEffect(() => {
    onSearch('Thai');
  }, []);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="App bg-gray">
      <Header onSearch={onSearch} />

      {loading && <div>loading...</div>}

      <div className="w-4/12">
        {!loading &&
          restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.place_id} restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
}

export default App;
