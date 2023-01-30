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
        onClick={() => setSelectedRestaurant(restaurant)}
        src={isSelected ? pinSelected : pinResting}
        alt="pin-resting"
      />
      {isSelected && (
        <div className="w-[327px]">
          <RestaurantItem restaurant={restaurant} />
        </div>
      )}
    </div>
  );
};
