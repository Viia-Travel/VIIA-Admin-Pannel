import React, { useEffect, useState } from "react";
import { MapPin, Car, Clock } from 'lucide-react';

const AVERAGE_SPEED_KMH = 40; // Average speed in km/h

// Helper functions
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatTime = (timeString) => {
    if (!timeString) return "Just now";
    if (timeString instanceof Date) {
        return timeString.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    // Handle ISO string format
    if (timeString.includes('T')) {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

const parseLatLng = (str) => {
    if (!str) return null;
    if (typeof str === 'object' && str.lat && str.lng) return str;
    if (str.startsWith('LatLng(')) {
        str = str.replace('LatLng(', '').replace(')', '');
    }
    const [lat, lng] = str.split(',').map(Number);
    return { lat, lng };
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

const TripStatus = ({ tripData, userType, carLocation }) => {
    const [estimatedEndTime, setEstimatedEndTime] = useState(null);
    const [distanceCovered, setDistanceCovered] = useState(0);
    const [estimatedDistance, setEstimatedDistance] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (carLocation && tripData?.startPoint && tripData?.endPoint) {
            // Calculate distance to endpoint
            const endPoint = parseLatLng(tripData.endPoint);
            const startPoint = parseLatLng(tripData.startPoint);
            
            if (endPoint && startPoint) {
                // Calculate total distance
                const totalDistance = calculateDistance(
                    startPoint.lat,
                    startPoint.lng,
                    endPoint.lat,
                    endPoint.lng
                );
                setEstimatedDistance(totalDistance);

                // Calculate distance covered
                const distanceToEnd = calculateDistance(
                    carLocation.lat,
                    carLocation.lng,
                    endPoint.lat,
                    endPoint.lng
                );
                const distanceTraveled = totalDistance - distanceToEnd;
                setDistanceCovered(distanceTraveled);

                // Calculate progress
                const progressPercent = (distanceTraveled / totalDistance) * 100;
                setProgress(Math.min(progressPercent, 100));
                
                // Calculate estimated time based on average speed (assuming 30 km/h in city)
                const averageSpeed = 30; // km/h
                const timeInHours = distanceToEnd / averageSpeed;
                const timeInMinutes = Math.round(timeInHours * 60);
                setEstimatedTime(timeInMinutes);
                
                // Calculate end time
                const startTime = new Date(`${tripData.date} ${tripData.startTime}`);
                const endTime = new Date(startTime.getTime() + timeInMinutes * 60000);
                
                setEstimatedEndTime(formatTime(endTime));
            }
        }
    }, [carLocation, tripData]);

    // If tripData is not available, show loading state
    if (!tripData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            {/* Trip Details */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Distance Covered</h3>
                        <p className="text-lg font-semibold">{tripData.distanceCovered || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Current Location</h3>
                        <p className={`text-lg ${userType === 'ongoing' ? 'text-green-500' : 'text-gray-700'}`}>
                            {tripData.currentLocation || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Start Point</h3>
                        <p className="text-lg font-semibold">{tripData.startPoint || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">End Point</h3>
                        <p className="text-lg font-semibold">{tripData.endPoint || "N/A"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                        <p className="text-lg font-semibold">{formatDate(tripData.date) || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
                        <p className="text-lg font-semibold">{tripData.startTime || "N/A"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Estimated End Time</h3>
                        <p className="text-lg font-semibold">{tripData.estimatedEndTime || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Price</h3>
                        <p className="text-lg font-semibold">{tripData.price || "N/A"}</p>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                    <Clock className="text-gray-500" />
                    <span className="text-gray-600">Last updated: {formatTime(tripData.lastUpdated)}</span>
                </div>
            </div>
        </div>
    );
};

export default TripStatus;
