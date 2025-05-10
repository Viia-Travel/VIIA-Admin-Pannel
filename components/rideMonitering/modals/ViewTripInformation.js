import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import TripStatus from "../RideComponents/TripStatus";
import CarDetails from "../RideComponents/CarDetails";
import DriverInfo from "../RideComponents/DriverInfo";
import PassengerInfo from "../RideComponents/PassengerInfo";
import Safety from "../RideComponents/Safety";
import { useRouter } from "next/router";
import { UseGetRideDetail } from "@/hooks/query/rides/getRideDetail";

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
    return distance.toFixed(1);
};

const deg2rad = (deg) => {
    return deg * (Math.PI/180);
};

const ViewTripInformation = ({ isOpen, onClose, data, userType }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const { data: rideDetail } = UseGetRideDetail(data.id);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };

    const getDistance = () => {
        if (!rideDetail?.pickup_lat_long || !rideDetail?.destination_lat_long) return "Calculating...";
        
        const [pickupLat, pickupLon] = rideDetail.pickup_lat_long.split(',').map(Number);
        const [destLat, destLon] = rideDetail.destination_lat_long.split(',').map(Number);
        
        return `${calculateDistance(pickupLat, pickupLon, destLat, destLon)} km`;
    };

    const tripData = {
        tripStatus: {
            distanceCovered: getDistance(),
            startPoint: rideDetail?.pickup || "N/A",
            currentLocation: rideDetail?.current_location || "N/A",
            endPoint: rideDetail?.destination || "N/A",
            date: rideDetail?.date || "N/A",
            startTime: rideDetail?.time || "N/A",
            estimatedEndTime: "Calculating...", // You might want to calculate this
            price: `£${rideDetail?.cost || 0}`,
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

    const tabList = ["Trip Status", "Car Details", "Driver Info", "Passenger Info", "Safety"];

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" className="rounded-xl">
            <DialogTitle>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Trip Information</h3>
                    <button onClick={onClose}>
                        <svg className="h-6 w-6 cursor-pointer text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </DialogTitle>
            <div className="p-5 text-lg">
                <h2>
                    <span className="font-semibold">Trip ID: </span>
                    {rideDetail?.id}
                </h2>
                <div className="flex space-x-3 mt-3 pb-2 border-b">
                    <h2>Trip Status</h2>
                    <div
                        className={`px-4 py-1 rounded-lg text-sm font-semibold ${
                            userType === 'ongoing' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                        }`}
                    >
                        {userType === 'ongoing' ? "In-progress" : "Completed"}
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-5 gap-4 mx-5 border-b bg-gray-100 border-gray-300">
                    {tabList.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => handleTabChange(index)}
                            className={`cursor-pointer text-center py-2 px-4 ${
                                currentTab === index 
                                    ? "bg-white border rounded-lg text-black shadow-md" 
                                    : "bg-gray-100 text-[#667085]"
                            }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    {currentTab === 0 && <TripStatus tripData={tripData.tripStatus} userType={userType} />}
                    {currentTab === 1 && <CarDetails carData={tripData.carDetails} />}
                    {currentTab === 2 && <DriverInfo driverData={tripData.driverInfo} />}
                    {currentTab === 3 && <PassengerInfo passengers={tripData.passengerInfo} />}
                    {currentTab === 4 && <Safety safetyInfo={tripData.safetyInfo} />}
                </div>
                {/* <div className="flex space-x-5 justify-end border-gray-200 p-4 text-base font-semibold">
                    <button className="text-black border px-3 py-1 rounded-md" onClick={onClose}>
                        Back
                    </button>
                    <button 
                        className="bg-green-500 text-white px-3 py-1 rounded-md" 
                        onClick={() => router.push(`/ride-monitering/live-tracking?id=${rideDetail?.id}`)}
                    >
                        Live Tracking
                    </button>
                </div> */}
            </div>
        </Dialog>
    );
};

export default ViewTripInformation;
