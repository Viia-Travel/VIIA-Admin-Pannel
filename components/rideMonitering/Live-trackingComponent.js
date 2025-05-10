import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { LockKeyhole } from 'lucide-react';
import TripStatus from './RideComponents/TripStatus';
import CarDetails from './RideComponents/CarDetails';
import DriverInfo from './RideComponents/DriverInfo';
import PassengerInfo from './RideComponents/PassengerInfo';
import Safety from './RideComponents/Safety';
import dynamic from 'next/dynamic';
import { UseGetRideDetail } from '@/hooks/query/rides/getRideDetail';
import DataLoader from '../ui/dataLoader';
import Pusher from 'pusher-js';
import LiveCarMap from './LiveCarMap';

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(1);
};

export default function LivetrackingComponent() {
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const { data: rideDetail, isLoading, isError } = UseGetRideDetail(id, {
    enabled: router.isReady && !!id, // Only fetch when router is ready and id exists
  });
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [carLocation, setCarLocation] = useState(null);

  // Helper to extract user id (driver or requester)
  const userId = rideDetail?.driver_id || rideDetail?.requester_id;

  // Pusher setup for live tracking
  useEffect(() => {
    if (isTracking && userId) {
      console.log('Initializing Pusher...');
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        encrypted: true,
        forceTLS: true,
        logToConsole: true,
      });

      pusher.connection.bind('state_change', (states) => {
        console.log('Pusher state changed:', states);
      });

      pusher.connection.bind('connected', () => {
        console.log('Pusher connected!');
      });

      pusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      const channelName = `viia_ride_${id}`;
      const channel = pusher.subscribe(channelName);
      console.log('Subscribing to channel:', channelName);

      channel.bind('pusher:subscription_succeeded', () => {
        console.log(`Subscribed to channel: ${channelName}`);
      });

      channel.bind('pusher:subscription_error', (status) => {
        console.error('Subscription error:', status);
      });

      channel.bind('trip-events', (data) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('Received trip-events:', parsed);

        if (parsed.message?.data) {
          const tripData = parsed.message.data;
          // Update car location
          if (tripData.current_location) {
            const [lat, lng] = tripData.current_location.split(',').map(Number);
            setCarLocation({ lat, lng });
          }

          // Update ride detail with new data
          if (rideDetail) {
            const updatedRideDetail = {
              ...rideDetail,
              current_location: tripData.current_location,
              status: tripData.status,
              request_status: tripData.request_status,
            };
            // Update the trip data
            const updatedTripData = {
              ...tripData,
              tripStatus: {
                distanceCovered: getDistance(),
                startPoint: tripData.pickup || "N/A",
                currentLocation: tripData.current_location || "N/A",
                endPoint: tripData.destination || "N/A",
                date: tripData.date || "N/A",
                startTime: tripData.time || "N/A",
                estimatedEndTime: estimatedTime ? `${Math.round(estimatedTime / 60)} mins` : 'Calculating...',
                price: `£${tripData.cost || 0}`,
                lastUpdated: parsed.time || new Date().toISOString(),
              }
            };
          }
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    }
  }, [isTracking, userId, id, rideDetail, estimatedTime]);

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  const handleTrackNow = () => {
    setIsTracking(true);
  };

  const handleGoBack = () => {
    router.push("/ride-monitering");
  };

  const tabList = ["Trip Status", "Car Details", "Driver Info", "Passenger Info", "Safety"];
  const getDistance = () => {
    if (!rideDetail?.pickup_lat_long || !rideDetail?.destination_lat_long) return "Calculating...";
    const [pickupLat, pickupLon] = rideDetail.pickup_lat_long.split(',').map(Number);
    const [destLat, destLon] = rideDetail.destination_lat_long.split(',').map(Number);
    return `${calculateDistance(pickupLat, pickupLon, destLat, destLon)} km`;
  };
  useEffect(() => {
    if (rideDetail?.pickup_lat_long && rideDetail?.destination_lat_long) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        { 
          origin: rideDetail?.pickup_lat_long,
          destination: rideDetail?.destination_lat_long,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) { 
            const route = result.routes[0];
            const totalDuration = route.legs[0].duration.value; // in seconds
            setEstimatedTime(totalDuration);
          }
        }
      );
    }
  }, [rideDetail]); 

  console.log(rideDetail)
  const tripData = {
    tripStatus: {
      distanceCovered: getDistance(),
      startPoint: rideDetail?.pickup || "N/A",
      currentLocation: rideDetail?.current_location || "N/A",
      endPoint: rideDetail?.destination || "N/A",
      date: rideDetail?.date || "N/A",
      startTime: rideDetail?.time || "N/A",
      estimatedEndTime: estimatedTime ? `${Math.round(estimatedTime / 60)} mins` : 'Calculating...',
      price: `£${rideDetail?.cost || 0}`,
      lastUpdated: new Date().toISOString(),
    },
    carDetails: {
      model: rideDetail?.driver?.vehicle?.make || "N/A",
      color: rideDetail?.driver?.vehicle?.colour || "N/A",
      licenseNumber: rideDetail?.driver?.vehicle?.numberPlate || "N/A",
    },
    driverInfo: {
      name: `${rideDetail?.driver?.fname || ""} ${rideDetail?.driver?.lname || ""}`,
      phone: rideDetail?.driver?.phone || "N/A",
      email: rideDetail?.driver?.email || "N/A",
      dob: rideDetail?.driver?.dob || "N/A",
      gender: rideDetail?.driver?.gender || "N/A",
      rating: rideDetail?.driver?.average_rating?.average || 0,
      totalReviews: rideDetail?.driver?.average_rating?.total_reviews || 0,
      avatar: rideDetail?.driver?.avatar,
      preferences: rideDetail?.driver?.preferences ? JSON.parse(rideDetail?.driver?.preferences) : [],
    },
    passengerInfo: rideDetail?.passengers?.map(passenger => ({
      name: `${passenger.user?.fname || ""} ${passenger.user?.lname || ""}`,
      email: passenger.user?.email || "N/A",
      phone: passenger.user?.phone || "N/A",
      dob: passenger.user?.dob || "N/A",
      gender: passenger.user?.gender || "N/A",
      rating: passenger.user?.average_rating?.average || 0,
      totalReviews: passenger.user?.average_rating?.total_reviews || 0,
      avatar: passenger.user?.avatar,
      rideStatus: passenger.ride_status || "N/A",
      paymentStatus: passenger.payment_status || "N/A",
      preferences: passenger.user?.preferences ? JSON.parse(passenger.user?.preferences) : [],
      interests: passenger.user?.interests ? JSON.parse(passenger.user?.interests) : [],
    })) || [],
    safetyInfo: {
      driverPhone: rideDetail?.driver?.phone || "N/A",
      driverEmail: rideDetail?.driver?.email || "N/A",
      driverAvatar: rideDetail?.driver?.avatar || "N/A",
      requesterPhone: rideDetail?.requester?.phone || "N/A",
      requesterEmail: rideDetail?.requester?.email || "N/A",
      requesterAvatar: rideDetail?.requester?.avatar || "N/A",
    },
  };
  // Show loading state while router is not ready or data is loading
  if (!router.isReady || isLoading) {
    return <DataLoader />;
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Error Loading Ride Details</h2>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Show no data state
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">No Ride ID Provided</h2>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Show no ride found state
  if (!rideDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">No Ride Found</h2>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className='p-4 px-6'>
      <div className='flex justify-between'>
        <h2 className="font-semibold text-slate-600 text-base ">
          <span className="cursor-pointer" onClick={handleGoBack}>
            Ride Monitoring
          </span>{"   "}
          &gt;   <span className="text-green-500"> Live Tracking </span>
        </h2>
        <div>
          <button className="bg-[#4E5BA6] text-white rounded-md px-2 py-2 flex">
            <LockKeyhole className="mr-2" />
            Safety Button
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-lg">Live Tracking</h2>
        <p className="text-sm">View and manage all ongoing trips, live tracking.</p>
      </div>

      {/* Map Section */}
      <div className="mb-6">
        <LiveCarMap
          trip={rideDetail}
          pickup={rideDetail?.pickup_lat_long}
          destination={rideDetail?.destination_lat_long}
          carLocation={carLocation}
        />
      </div>

      <div className="grid grid-cols-6 gap-2 mt-6">
        {/* Left Side: Trip Card */}
        <div className='col-span-2 border rounded-lg shadow-md p-3'>
          <div className="rounded-xl border shadow-md p-3 mb-4 border-green-500">
            <span>Trip Code/ID </span>
            <h2 className='text-xl font-semibold'>{rideDetail?.id || "N/A"}</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Pickup Location</p>
              <p className="font-medium">{rideDetail?.pickup || "N/A"}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-medium">{rideDetail?.destination || "N/A"}</p>
            </div>
            <button
              onClick={handleTrackNow}
              className={`rounded-md px-4 py-2 mt-3 w-full ${isTracking ? 'bg-green-500 text-white' : 'bg-slate-50 text-green-500'
                }`}
            >
              {isTracking ? 'Tracking' : 'Track Now'}
            </button>
          </div>
        </div>

        {/* Right Side: Display Tracking Details */}
        <div className='border col-span-4 rounded-md shadow-md p-3 min-h-[600px]'>
          <div className='flex space-x-3 mt-3 pb-5 border-b'>
            <h2>
              <span className="font-semibold">Trip Code: </span>
              {rideDetail?.id || "N/A"}
            </h2>
            <div className="px-4 py-1 rounded-lg text-sm font-semibold bg-blue-100 text-blue-600">
            Ongoing
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 border-b bg-gray-100 border-gray-300">
            {tabList.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleTabChange(index)}
                className={`cursor-pointer text-center py-2 px-4 ${currentTab === index ? "bg-white border rounded-lg text-black shadow-md" : "bg-gray-100 text-[#667085]"
                  }`}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="mt-4">
            {currentTab === 0 && <TripStatus tripData={tripData.tripStatus} userType="ongoing" carLocation={carLocation} />}
            {currentTab === 1 && <CarDetails carData={tripData.carDetails} />}
            {currentTab === 2 && <DriverInfo driverData={tripData.driverInfo} />}
            {currentTab === 3 && <PassengerInfo passengers={tripData.passengerInfo} />}
            {currentTab === 4 && <Safety safetyInfo={tripData.safetyInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
