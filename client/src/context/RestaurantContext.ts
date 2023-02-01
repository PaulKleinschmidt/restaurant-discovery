import { createContext } from 'react';
import { TRestaurant } from '../api/types';

type TRestaurantContext = {
  selectedRestaurant: TRestaurant | null;
  setSelectedRestaurant(restaurant: TRestaurant): void;
  favorites: TRestaurant[];
  setFavorites(restaurants: TRestaurant[]): void;
};

export const RestaurantContext = createContext<TRestaurantContext>({
  selectedRestaurant: null,
  setSelectedRestaurant: () => {},
  favorites: [],
  setFavorites: () => {},
});
