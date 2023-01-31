import { Restaurant, RestaurantResults } from '../api/types';
import { default as pinResting } from '../assets/pin-resting.svg';
import { default as pinSelected } from '../assets/pin-selected.svg';
import { RestaurantItem } from './RestaurantItem';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';

type Props = {
  lat: number;
  lng: number;
  restaurant: Restaurant;
};

export const MapLocation = ({ restaurant }: Props) => {
  const { setSelectedRestaurant, selectedRestaurant } =
    useContext(RestaurantContext);

  const isSelected = selectedRestaurant?.place_id === restaurant.place_id;

  return (
    <div>
      <img
        // Translate and backfaceVisibility prevent markers from repositioning on zoom
        // https://github.com/google-map-react/google-map-react/issues/771
        className="absolute translate-y-[-50%] translate-x-[-50%]"
        onClick={() => setSelectedRestaurant(restaurant)}
        src={isSelected ? pinSelected : pinResting}
        alt="pin-resting"
      />
      {isSelected && (
        <div
          className="w-96 z-10 absolute"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <RestaurantItem restaurant={restaurant} hideBorder />
        </div>
      )}
    </div>
  );
};
