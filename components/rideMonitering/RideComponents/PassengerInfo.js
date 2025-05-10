import React from "react";
import { CircleIcon } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
const PassengerInfo = ({ passengers }) => {
    const renderStars = (rating) => {
        if (!rating) return null;
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`text-${index < rating ? 'yellow' : 'gray'}-400`}>★</span>
        ));
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <h3 className="text-lg font-semibold">
                    Total Passengers: {passengers?.length || 0}
                </h3>
            </div>

            <div className="space-y-6">
                {passengers?.map((passenger, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="relative">
                                <img
                                    src={passenger?.avatar || "https://via.placeholder.com/64"}
                                    alt="Passenger Profile"
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <CheckBadgeIcon className="absolute bottom-0 right-0 text-blue-500 h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-lg font-semibold">
                                        {passenger?.name || "N/A"}
                                    </h3>
                                    <CircleIcon className="h-3 w-3 text-green-400 fill-green-400" />
                                </div>
                                <div className="flex items-center my-2">
                    { passenger?.rating.length > 0 && renderStars(passenger?.rating)?.map((filled, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={filled ? "#EAAA08" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`w-6 h-6 ${filled ? "text-yellow-500" : "text-gray-300"}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                        </svg>
                    ))}
                    <span className="ml-3">({passenger.totalReviews} reviews)</span>
                </div>
                                
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-600">Email</h4>
                                <p className="text-lg">{passenger?.email || "N/A"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Phone</h4>
                                <p className="text-lg">{passenger?.phone || "N/A"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Date of Birth</h4>
                                <p className="text-lg">{passenger?.dob || "N/A"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Gender</h4>
                                <p className="text-lg">{passenger?.gender || "N/A"}</p>
                            </div>
                        </div>

                        {passenger?.preferences && passenger.preferences.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-600">Preferences</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {passenger.preferences.map((pref, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center bg-primary-500 text-white rounded-md px-2 py-1 gap-2"
                                        >
                                            <img
                                                src={`/assets/${pref.icon}.svg`}
                                                alt={pref.icon}
                                                className="w-4 h-4"
                                            />
                                            <p>{pref.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {passenger?.interests && passenger.interests.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-600">Interests</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {passenger.interests.map((interest, i) => (
                                        <div key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                            <span className="mr-1">{interest.icon}</span>
                                            {interest.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-gray-600">Ride Status</h4>
                                <p className={`text-lg ${
                                    passenger?.rideStatus === 'ended' 
                                        ? 'text-green-500' 
                                        : 'text-blue-500'
                                }`}>
                                    {passenger?.rideStatus || "N/A"}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Payment Status</h4>
                                <p className={`text-lg ${
                                    passenger?.paymentStatus === 'success' 
                                        ? 'text-green-500' 
                                        : 'text-red-500'
                                }`}>
                                    {passenger?.paymentStatus || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassengerInfo;
