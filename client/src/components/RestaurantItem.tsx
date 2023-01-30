import { Restaurant } from '../api/types';
import { default as star } from '../assets/star.svg';
import { default as bookmarkResting } from '../assets/bookmark-resting.svg';
import { default as bookmarkSaved } from '../assets/bookmark-saved.svg';
import { default as placeholderImage } from '../assets/placeholder-image.png';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import cx from 'classnames';

type Props = {
  restaurant: Restaurant;
  hideBorder?: boolean;
};

export const RestaurantItem = ({ restaurant, hideBorder }: Props) => {
  const { setSelectedRestaurant, selectedRestaurant } =
    useContext(RestaurantContext);

  const imageSrc = restaurant.image
    ? 'data:image/png;base64,' + restaurant.image
    : placeholderImage;
  return (
    <div
      onClick={() => setSelectedRestaurant(restaurant)}
      className={cx(
        'text-left text-base shadow-md rounded-2xl my-6 bg-white p-4 m-6 flex cursor-pointer border-2 border-transparent text-textSecondary',
        selectedRestaurant?.place_id === restaurant.place_id &&
          !hideBorder &&
          'border-green box-content'
      )}
    >
      <img
        src={imageSrc}
        className="w-16 h-[72px] object-cover border-c"
        alt="Restaurant image"
      />
      <div className="ml-3 w-full">
        <div className="flex justify-between mb-1 text-textPrimary">
          {restaurant.name} <img src={bookmarkResting} alt="favorite" />
        </div>
        <div className="flex mb-1 text-sm">
          <img src={star} alt="star" className="mr-1" />
          <span className="text-textPrimary">{restaurant.rating} • </span>(
          {restaurant.user_ratings_total})
        </div>
        <div className="text-sm">{restaurant.formatted_address}</div>
      </div>
    </div>
  );
};
