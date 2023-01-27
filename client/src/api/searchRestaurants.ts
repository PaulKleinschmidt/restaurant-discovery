import axios from 'axios';
import { z } from 'zod';
import { RestaurantResults } from './types';
import * as R from 'ramda';

export const searchRestaurants = async (
  query: string
): Promise<RestaurantResults> => {
  return axios
    .get(`/api/restaurants/search?query=${encodeURIComponent(query)}`)
    .then(R.pipe(R.prop('data'), RestaurantResults.parse));
};
