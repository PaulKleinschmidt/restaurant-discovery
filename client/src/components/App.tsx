import React, { useEffect, useState } from 'react';
import './App.css';
import { searchRestaurants } from '../api/searchRestaurants';
import { RestaurantResults } from '../api/types';
import { SearchBar } from './SearchBar';
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
    <div className="App">
      <SearchBar onSearch={onSearch} />

      {loading && <div>loading...</div>}

      {!loading &&
        restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.place_id} restaurant={restaurant} />
        ))}
    </div>
  );
}

export default App;
