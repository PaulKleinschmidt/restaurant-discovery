import axios from 'axios';
import { Restaurant, APIResponse } from './types';
import * as R from 'ramda';

export const searchRestaurants = async (
  query: string
): Promise<Restaurant[]> => {
  return axios
    .get(`/api/restaurants/search?query=${encodeURIComponent(query)}`)
    .then(R.pipe(R.prop('data'), APIResponse.parse));
};
