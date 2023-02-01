import axios from 'axios';
import { TRestaurant, APIResponse } from './types';
import * as R from 'ramda';

export const searchRestaurants = async (
  query: string,
  location: string
): Promise<TRestaurant[]> => {
  return axios
    .get(
      `/api/restaurants/search?query=${encodeURIComponent(
        query
      )}&location=${encodeURIComponent(location)}`
    )
    .then(R.pipe(R.prop('data'), APIResponse.parse));
};
