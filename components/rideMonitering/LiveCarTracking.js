import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { Car, MapPin } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '350px'
};

// Define libraries outside the component to ensure consistency
const libraries = ['maps', 'places', 'geometry'];

function LiveCarTracking({ trip }) {
  const [directions, setDirections] = useState(null);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
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
    if (isLoaded && trip?.pickup_lat_long && trip?.destination_lat_long) {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: parseLatLng(trip.pickup_lat_long),
          destination: parseLatLng(trip.destination_lat_long),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            // Calculate total distance and duration
            const route = result.routes[0];
            const totalDistance = route.legs[0].distance.value; // in meters
            const totalDuration = route.legs[0].duration.value; // in seconds
            setEstimatedDistance(totalDistance);
            setEstimatedTime(totalDuration);

            // Fit map bounds to show the entire route
            if (map) {
              const bounds = new google.maps.LatLngBounds();
              result.routes[0].overview_path.forEach(path => {
                bounds.extend(path);
              });
              map.fitBounds(bounds);
            }
          }
        }
      );
    }
  }, [isLoaded, trip, map]);

  const pickupLatLng = parseLatLng(trip?.pickup_lat_long);
  const destinationLatLng = parseLatLng(trip?.destination_lat_long);
  const currentCarLocation = parseLatLng(trip?.current_location);
  const center = currentCarLocation || pickupLatLng || { lat: 0, lng: 0 };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="space-y-4">
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        
        {pickupLatLng && (
          <Marker 
            position={pickupLatLng} 
            icon={{
              url: '/assets/pickup-marker.svg',
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        )}
        
        {destinationLatLng && (
          <Marker 
            position={destinationLatLng}
            icon={{
              url: '/assets/destination-marker.svg',
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        )}
        
        {currentCarLocation && (
          <Marker
            position={currentCarLocation}
            icon={{
              url: '/assets/Car_icon.svg',
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>

      {/* Trip Progress and Details */}
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
           
          </div>

          <div className="relative flex-1 h-1 bg-gray-300 mx-2">
            <div 
              className="absolute left-0 top-0 h-1 bg-green-500" 
              style={{ width: `${progress}%` }}
            ></div>
            <Car
              className="absolute top-[-12px] text-green-500 cursor-pointer"
              style={{ left: `${progress}%` }}
              title={trip.current_location}
            />
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="text-red-500" />
           
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
          <p>
              <span className="font-semibold">pickup:</span> {trip.pickup}
            </p>
          
         
            <p>
              <span className="font-semibold">Driver:</span> {trip.driver?.fname} {trip.driver?.lname}
            </p>
            <p>
              <span className="font-semibold">Departure:</span> {trip.time}
            </p>
            <p>
              <span className="font-semibold">Cost:</span> £{trip.cost}
            </p>
          </div>

          <div className="space-y-2 text-right">
          <span className="font-semibold">Destination:</span> {trip.destination}
            <p>
              <span className="font-semibold">Estimated Time:</span>{' '}
              {estimatedTime ? `${Math.round(estimatedTime / 60)} mins` : 'Calculating...'}
            </p>
            <p>
              <span className="font-semibold">Distance:</span>{' '}
              {estimatedDistance ? `${(estimatedDistance / 1000).toFixed(1)} km` : 'Calculating...'}
            </p>
            <p>
              <span className="font-semibold">Available Space:</span> {trip.available_space}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveCarTracking; 