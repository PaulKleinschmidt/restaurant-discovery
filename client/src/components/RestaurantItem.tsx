import { Restaurant } from '../api/types';

type Props = {
  restaurant: Restaurant;
};

export const RestaurantItem = ({ restaurant }: Props) => {
  return (
    <div>
      <div>{restaurant.name}</div>
      {restaurant.rating} • {restaurant.user_ratings_total}
    </div>
  );
};
