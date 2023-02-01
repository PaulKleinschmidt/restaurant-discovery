import axios from 'axios';
import { TRestaurant, APIResponse } from './types';
import * as R from 'ramda';

export const searchRestaurants = async (
  query: string
): Promise<TRestaurant[]> => {
  return axios
    .get(`/api/restaurants/search?query=${encodeURIComponent(query)}`)
    .then(R.pipe(R.prop('data'), APIResponse.parse));
};
