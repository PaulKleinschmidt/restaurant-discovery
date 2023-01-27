import React, { useEffect, useState } from 'react';
import './App.css';
import { searchRestaurants } from '../api/searchRestaurants';
import { RestaurantResults } from '../api/types';

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [restaurants, setRestaurants] = React.useState<RestaurantResults>([]);
  const [error, setError] = React.useState<Error | undefined>(undefined);

  const onSearch = async (query: string) => {
    setLoading(true);
    await searchRestaurants(query).then(setRestaurants).catch(setError);
    setLoading(false);
  };

  useEffect(() => {
    onSearch('Thai');
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="App">
      {restaurants.map((r) => (
        <div>{r.name}</div>
      ))}
    </div>
  );
}

export default App;
