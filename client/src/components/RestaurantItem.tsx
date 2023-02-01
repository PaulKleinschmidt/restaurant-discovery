import { TRestaurant } from '../api/types';
import { default as star } from '../assets/star.svg';
import { default as bookmarkResting } from '../assets/bookmark-resting.svg';
import { default as bookmarkSaved } from '../assets/bookmark-saved.svg';
import { default as placeholderImage } from '../assets/placeholder-image.png';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import cx from 'classnames';
import * as R from 'ramda';

type TProps = {
  restaurant: TRestaurant;
  hideBorder?: boolean;
};

export const RestaurantItem = ({ restaurant, hideBorder }: TProps) => {
  const { setSelectedRestaurant, selectedRestaurant, setFavorites, favorites } =
    useContext(RestaurantContext);

  const isSelectedRestaurant =
    selectedRestaurant?.place_id === restaurant.place_id;

  const imageSrc = restaurant.image
    ? 'data:image/png;base64,' + restaurant.image
    : placeholderImage;

  const isFavorited = R.includes(
    R.prop('place_id', restaurant),
    R.pluck('place_id', favorites)
  );

  const handleFlagClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    // Prevent flag click event from bubbling and triggering restaurant selection
    e.stopPropagation();

    if (isFavorited) {
      setFavorites(
        R.reject(R.propEq('place_id', restaurant.place_id))(favorites)
      );
    } else {
      setFavorites([...favorites, restaurant]);
    }
  };

  return (
    <div
      onClick={() => setSelectedRestaurant(restaurant)}
      className={cx(
        'text-left text-base shadow-md rounded-2xl my-6 bg-white p-4 m-6 flex cursor-pointer  text-textSecondary',
        isSelectedRestaurant && !hideBorder
          ? 'border-green border-2'
          : 'border-transparent border-2'
      )}
    >
      <img
        src={imageSrc}
        className="w-16 h-[72px] object-cover"
        alt={restaurant.name}
      />
      <div className="ml-3 w-full">
        <div className="flex justify-between mb-1 text-textPrimary">
          {restaurant.name}{' '}
          <img
            onClick={handleFlagClick}
            src={isFavorited ? bookmarkSaved : bookmarkResting}
            alt="favorite"
          />
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
