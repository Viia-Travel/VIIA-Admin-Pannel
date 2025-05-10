import React from "react";
import { CircleIcon } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const DriverInfo = ({ driverData }) => {
    const renderStars = (rating) => {
        return Array(5)
            .fill(false)
            .map((_, i) => i < Math.floor(rating));
    };

    const handleFlag = () => {
        console.log("Flag user clicked");
    };

    const handleMessage = () => {
        console.log("Message user clicked");
    };

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex space-x-4">
                <div className="relative">
                    <img 
                        src={driverData.avatar || "/assets/user.svg"} 
                        alt="Driver Profile" 
                        className="h-24 w-24 rounded-full object-cover" 
                    />
                    <CheckBadgeIcon className="absolute bottom-6 right-1 text-blue-500 h-6 w-6" />
                </div>
                <div>
                    <div className="flex space-x-2">
                        <p className="text-xl font-semibold">{driverData.name}</p>
                        <CircleIcon className="h-3 w-3 text-green-400 fill-green-400 mt-2" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-gray-500 mr-2">Driver</p>
                        |
                        <div className="rounded-full px-2 ml-5 text-sm text-green-600 bg-green-100">
                            <p>Verified</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <h4 className="font-semibold">Ratings</h4>
                <div className="flex items-center my-2">
                    {renderStars(driverData.rating).map((filled, index) => (
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
                    <span className="ml-3">({driverData.totalReviews} reviews)</span>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-gray-700">{driverData.email}</p>
                </div>
                <div>
                    <p className="font-semibold">Phone:</p>
                    <p className="text-gray-700">{driverData.phone}</p>
                </div>
                <div>
                    <p className="font-semibold">Date of Birth:</p>
                    <p className="text-gray-700">{driverData.dob}</p>
                </div>
                <div>
                    <p className="font-semibold">Gender:</p>
                    <p className="text-gray-700">{driverData.gender}</p>
                </div>
                {driverData.preferences && driverData.preferences.length > 0 && (
                    <div>
                        <p className="font-semibold">Preferences:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {driverData.preferences.map((pref, index) => (
                               
                                    <div
                                        key={index}
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
            </div>

            {/* <div className="flex justify-end space-x-2 mt-8">
                <button
                    type="button"
                    className="text-sm text-red-700 px-3 py-2 bg-white border border-red-700 rounded-md hover:bg-red-50"
                    onClick={handleFlag}
                >
                    Flag User
                </button>
                <button
                    type="button"
                    onClick={handleMessage}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                >
                    Message
                </button>
            </div> */}
        </div>
    );
};

export default DriverInfo;
