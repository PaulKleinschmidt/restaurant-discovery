import { createContext } from 'react';
import { Restaurant } from '../api/types';

type RestaurantContext = {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant(restaurant: Restaurant): void;
};

export const RestaurantContext = createContext<RestaurantContext>({
  selectedRestaurant: null,
  setSelectedRestaurant: () => {},
});
