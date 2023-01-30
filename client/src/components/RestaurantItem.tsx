import { Restaurant } from '../api/types';
import { default as star } from '../assets/star.svg';
import { default as bookmarkResting } from '../assets/bookmark-resting.svg';
import { default as bookmarkSaved } from '../assets/bookmark-saved.svg';

type Props = {
  restaurant: Restaurant;
};

export const RestaurantItem = ({ restaurant }: Props) => {
  return (
    <div className="text-left text-base shadow-md rounded-2xl my-6 bg-white p-4 m-6 flex">
      <img
        src={'data:image/png;base64,' + restaurant.image}
        className="w-16 h-[72px] object-cover"
      />

      <div className="ml-3">
        <div className="font-bold flex justify-between">
          {restaurant.name} <img src={bookmarkResting} alt="favorite" />
        </div>
        <div className="flex">
          <img src={star} alt="star" />
          {restaurant.rating} • {restaurant.user_ratings_total}
        </div>

        <div>{restaurant.formatted_address}</div>
      </div>
    </div>
  );
};
