import { Restaurant } from '../api/types';
import GoogleMapReact from 'google-map-react';
import { MapLocation } from './MapLocation';

type Props = {
  restaurants: Restaurant[];
};

export const Map = ({ restaurants }: Props) => {
  const initialLat = restaurants[0].geometry.location.lat;
  const initialLong = restaurants[0].geometry.location.lng;

  const defaultProps = {
    center: {
      lat: initialLat,
      lng: initialLong,
    },
    zoom: 11,
  };

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    throw new Error('REACT_APP_GOOGLE_MAPS_API_KEY env variable not set');
  }

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
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
