import { MapPin, Car, Clock } from 'lucide-react';

export default function TripProgressBar({ trip }) {
  return (
    <div className="p-4 mt-6 bg-white rounded-lg shadow-lg">
      {/* Start and End Points with Progress Bar */}
      <div className="relative flex items-center justify-between">
        {/* Start Point */}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <p className="font-semibold">{trip?.tripStatus?.startPoint}</p>
        </div>

        {/* Green Progress Line */}
        <div className="relative flex-1 h-1 bg-gray-300 mx-2">
          <div className="absolute left-0 top-0 h-1 bg-green-500" style={{ width: "50%" }}></div>
          {/* Car Icon moving on progress line */}
          <Car
            className="absolute top-[-12px] text-green-500 cursor-pointer"
            style={{ left: '50%' }}
            title={trip?.tripStatus?.currentLocation} // Tooltip on hover with current location
          />
        </div>

        {/* End Point */}
        <div className="flex items-center space-x-2">
          <MapPin className="text-red-500" />
          <p className="font-semibold">{trip?.tripStatus?.endPoint}</p>
        </div>
      </div>

    
    </div>
  );
}
