import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Define libraries outside the component to ensure consistency
const libraries = ['maps', 'places', 'geometry'];

function MapComponent({ trips, onTripSelect }) {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  const parseLatLng = (str) => {
    if (!str) return null;
    if (str.startsWith('LatLng(')) {
      str = str.replace('LatLng(', '').replace(')', '');
    }
    const [lat, lng] = str.split(',').map(Number);
    return { lat, lng };
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && trips && trips.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      const locations = trips
        .map(trip => parseLatLng(trip.current_location))
        .filter(loc => loc !== null);

      locations.forEach(location => {
        bounds.extend(location);
      });

      map.fitBounds(bounds);
    }
  }, [map, trips]);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    if (onTripSelect) {
      onTripSelect(trip);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {trips?.map((trip, index) => {
          const carLocation = parseLatLng(trip.current_location);
          if (!carLocation) return null;

          return (
            <React.Fragment key={trip.id}>
              <Marker
                position={carLocation}
                onClick={() => handleTripSelect(trip)}
                icon={{
                  url: '/assets/Car_icon.svg',
                  scaledSize: new google.maps.Size(40, 40),
                }}
              />
              {selectedTrip?.id === trip.id && (
                <InfoWindow
                  position={carLocation}
                  onCloseClick={() => setSelectedTrip(null)}
                >
                  <div className="p-2 max-w-[300px]">
                    <h3 className="font-semibold text-lg mb-2">
                      Trip #{trip.id}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Driver:</span> {trip.driver?.fname} {trip.driver?.lname}
                      </p>
                      <p>
                        <span className="font-medium">From:</span> {trip.pickup}
                      </p>
                      <p>
                        <span className="font-medium">To:</span> {trip.destination}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span> {trip.time}
                      </p>
                      <p>
                        <span className="font-medium">Cost:</span> £{trip.cost}
                      </p>
                      <p>
                        <span className="font-medium">Available Space:</span> {trip.available_space}
                      </p>
                      <button
                        onClick={() => handleTripSelect(trip)}
                        className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Track This Trip
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>

      {/* Trip List Sidebar */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-h-[calc(500px-2rem)] overflow-y-auto w-80">
        <h3 className="font-semibold text-lg mb-3">Active Trips</h3>
        <div className="space-y-3">
          {trips?.map((trip) => (
            <div
              key={trip.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedTrip?.id === trip.id
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => handleTripSelect(trip)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Trip #{trip.id}</p>
                  <p className="text-sm text-gray-600">{trip.driver?.fname} {trip.driver?.lname}</p>
                </div>
                <span className="text-sm font-medium">£{trip.cost}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p className="truncate">{trip.pickup}</p>
                <p className="truncate">{trip.destination}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
