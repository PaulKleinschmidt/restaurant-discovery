import { TRestaurant } from '../api/types';
import GoogleMapReact from 'google-map-react';
import { MapLocation } from './MapLocation';
import { useEffect, useRef, useState } from 'react';
import { default as search } from '../assets/search.svg';
import { LoadingState } from '../types/LoadingState';

type TProps = {
  restaurants: TRestaurant[];
  setSearchArea(coordinates: string): void;
  onSearch(): void;
  loadingState: LoadingState;
};

export const Map = ({
  restaurants,
  setSearchArea,
  loadingState,
  onSearch,
}: TProps) => {
  const [searchButtonVisible, setSearchButtonVisible] =
    useState<boolean>(false);

  const defaultProps = useRef({
    center: {
      lat: restaurants[0]?.geometry.location.lat,
      lng: restaurants[0]?.geometry.location.lng,
    },
    zoom: 11,
  });

  useEffect(() => {
    setSearchButtonVisible(false);
  }, [restaurants, loadingState.searchTerm]);

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    throw new Error('REACT_APP_GOOGLE_MAPS_API_KEY env variable not set');
  }

  return (
    <div className="h-full w-full relative">
      {searchButtonVisible && (
        <button
          className="absolute top-4 z-50 bg-gray shadow-sm py-2 px-4 rounded-4xl text-sm font-semibold translate-x-[-50%]"
          onClick={onSearch}
        >
          <div className="flex">
            {loadingState.searchLocation ? (
              <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-green border-t-transparent my-auto mr-4" />
            ) : (
              <img src={search} className="mr-4 w-4" alt="search-icon" />
            )}
            Search this area
          </div>
        </button>
      )}

      <GoogleMapReact
        onChange={(map) => {
          setSearchButtonVisible(true);
          setSearchArea(`${map.center.lat},${map.center.lng}`);
        }}
        draggable={!loadingState.searchLocation && !loadingState.searchTerm}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.current.center}
        defaultZoom={defaultProps.current.zoom}
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
