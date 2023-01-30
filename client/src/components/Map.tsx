import { Restaurant, RestaurantResults } from '../api/types';
import GoogleMapReact from 'google-map-react';
import { MapLocation } from './MapLocation';

type Props = {
  restaurants: RestaurantResults;
};

export const Map = ({ restaurants }: Props) => {
  const initialLat = restaurants[0].geometry?.location.lat;
  const initialLong = restaurants[0].geometry?.location.lng;

  if (!initialLat || !initialLong) {
    return <div>oh no</div>;
  }

  console.log(restaurants[0].geometry?.location.lat);
  const defaultProps = {
    center: {
      lat: initialLat,
      lng: initialLong,
    },
    zoom: 11,
  };

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {restaurants.map((restaurant) => {
          const lat = restaurant.geometry?.location.lat;
          const lng = restaurant.geometry?.location.lng;
          return (
            lat &&
            lng && (
              <MapLocation
                key={restaurant.place_id}
                lat={lat}
                lng={lng}
                restaurant={restaurant}
              />
            )
          );
        })}
      </GoogleMapReact>
    </div>
  );
};
