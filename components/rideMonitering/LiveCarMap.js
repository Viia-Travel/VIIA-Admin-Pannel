import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import TripProgressBar from './RideComponents/TripProgressBar';
import { Car, MapPin } from 'lucide-react';

// UK bounds
const UK_BOUNDS = {
  north: 60.85,
  south: 49.9,
  east: 1.77,
  west: -8.65
};

// UK center
const UK_CENTER = {
  lat: 54.5,
  lng: -2.0
};

const containerStyle = {
  width: '100%',
  height: '400px'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  restriction: {
    latLngBounds: UK_BOUNDS,
    strictBounds: true
  },
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

// Define libraries outside the component to ensure consistency
const libraries = ['maps', 'places', 'geometry'];

function LiveCarMap({ pickup, destination, carLocation, trip }) {
  const [directions, setDirections] = useState(null);
  const [progress, setProgress] = useState(0);
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [map, setMap] = useState(null);
  const [currentCarPosition, setCurrentCarPosition] = useState(null);

  const onLoad = useCallback((map) => {
    if (map) {
      // Set initial bounds to UK
      map.fitBounds(UK_BOUNDS);
      setMap(map);
    }
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

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

  // Update currentCarPosition when carLocation or trip.currentLocation changes
  useEffect(() => {
    if (carLocation) {
      setCurrentCarPosition(carLocation);
    } else if (trip?.current_location) {
      setCurrentCarPosition(parseLatLng(trip.current_location));
    }
  }, [carLocation, trip?.current_location]);

  // Calculate progress based on current location
  const calculateProgress = useCallback((currentLoc, startLoc, endLoc) => {
    if (!currentLoc || !startLoc || !endLoc) return 0;

    const directionsService = new window.google.maps.DirectionsService();
    const distanceMatrixService = new window.google.maps.DistanceMatrixService();

    return new Promise((resolve) => {
      directionsService.route(
        {
          origin: startLoc,
          destination: endLoc,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0];
            const totalDistance = route.legs[0].distance.value;

            // Calculate distance from start to current location
            distanceMatrixService.getDistanceMatrix(
              {
                origins: [startLoc],
                destinations: [currentLoc],
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === window.google.maps.DistanceMatrixStatus.OK) {
                  const distanceTraveled = response.rows[0].elements[0].distance.value;
                  const progress = (distanceTraveled / totalDistance) * 100;
                  resolve(Math.min(progress, 100));
                } else {
                  resolve(0);
                }
              }
            );
          } else {
            resolve(0);
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    if (isLoaded && trip?.pickup_lat_long && trip?.destination_lat_long) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: parseLatLng(trip.pickup_lat_long),
          destination: parseLatLng(trip.destination_lat_long),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const route = result.routes[0];
            const totalDistance = route.legs[0].distance.value;
            const totalDuration = route.legs[0].duration.value;
            setEstimatedDistance(totalDistance);
            setEstimatedTime(totalDuration);

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

  // Update progress when currentCarPosition changes
  useEffect(() => {
    if (currentCarPosition && trip?.pickup_lat_long && trip?.destination_lat_long) {
      const startLoc = parseLatLng(trip.pickup_lat_long);
      const endLoc = parseLatLng(trip.destination_lat_long);
      
      calculateProgress(currentCarPosition, startLoc, endLoc).then(progress => {
        setProgress(progress);
      });
    }
  }, [currentCarPosition, trip, calculateProgress]);

  const pickupLatLng = parseLatLng(trip?.pickup_lat_long);
  const destinationLatLng = parseLatLng(trip?.destination_lat_long);
  const center = currentCarPosition || pickupLatLng || { lat: 0, lng: 0 };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={UK_CENTER}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        
        {pickupLatLng && (
          <Marker 
            position={pickupLatLng} 
            icon={{
              url: '/assets/pickup-marker.svg',
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        )}
        
        {destinationLatLng && (
          <Marker 
            position={destinationLatLng}
            icon={{
              url: '/assets/destination-marker.svg',
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        )}

        {currentCarPosition && (
          <Marker
            position={currentCarPosition}
            icon={{
              url: '/assets/Car_icon.svg',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>

      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>

          <div className="relative flex-1 h-1 bg-gray-300 mx-2">
            <div 
              className="absolute left-0 top-0 h-1 bg-green-500 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
            <Car
              className="absolute top-[-12px] text-green-500 cursor-pointer transition-all duration-500"
              style={{ 
                left: `${progress}%`,
                transform: 'translateX(-50%)'
              }}
              title={trip?.current_location}
            />
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="text-red-500" />
          </div>
        </div>
<div className='grid grid-cols-2 gap-4'>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Pickup:</span> {trip?.pickup}
          </p>
          <p>
            <span className="font-semibold">Driver:</span> {trip?.driver?.fname} {trip?.driver?.lname}
          </p>
          <p>
            <span className="font-semibold">Departure:</span> {trip?.time}
          </p>
          <p>
            <span className="font-semibold">Cost:</span> £{trip?.cost}
          </p>
        </div>

        <div className="space-y-2 text-right">
          <span className="font-semibold">Destination:</span> {trip?.destination}
          <p>
            <span className="font-semibold">Estimated Time:</span>{' '}
            {estimatedTime ? `${Math.round(estimatedTime / 60)} mins` : 'Calculating...'}
          </p>
          {/* <p>
            <span className="font-semibold">Distance:</span>{' '}
            {estimatedDistance ? `${(estimatedDistance / 1000).toFixed(1)} km` : 'Calculating...'}
          </p> */}
          {/* <p>
            <span className="font-semibold">Progress:</span> {progress.toFixed(1)}%
          </p> */}
            </div>
            </div>
      </div>
    </div>
  );
}

export default LiveCarMap; 
