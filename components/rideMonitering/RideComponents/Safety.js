import React from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { CircleIcon } from "lucide-react";

const Safety = ({ safetyInfo }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`${text} copied to clipboard!`);
    };

    const handleMessage = () => {
        console.log("Send message clicked");
    };

    const handleDecline = () => {
        console.log("Decline clicked");
    };

    return (
        <div className="p-4 rounded-lg shadow-sm border">
            <div className="flex space-x-4 items-center mb-6">
                <p className="font-semibold">Safety Check</p>
                <div className="px-2 py-1 rounded-lg bg-red-100 text-red-600">
                    <p className="font-semibold">Emergency</p>
                </div>
            </div>

            {/* Driver Information */}
            <div className="mb-6">
                <h4 className="font-semibold mb-4">Driver Contact</h4>
                <div className="flex space-x-4">
                    <div className="relative">
                        <img
                            src={safetyInfo.driverAvatar}
                            alt="Driver Profile" 
                            className="h-16 w-16 rounded-full object-cover" 
                        />
                        <CheckBadgeIcon className="absolute bottom-4 right-0 text-blue-500 h-5 w-5" />
                    </div>
                    <div>
                        <div className="flex space-x-2">
                            <p className="text-lg font-semibold">Driver</p>
                            <CircleIcon className="h-3 w-3 text-green-400 fill-green-400 mt-2" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full px-2 text-sm text-green-600 bg-green-100">
                                <p>Verified</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4 w-full">
                    <div className="relative flex items-center border rounded-lg w-full">
                        <input
                            type="text"
                            value={safetyInfo.driverEmail}
                            readOnly
                            className="w-full p-2 pr-24 border-none rounded-l-lg"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pl-2 border-l">
                            <span className="text-gray-500 cursor-pointer" onClick={() => handleCopy(safetyInfo.driverEmail)}>Copy</span>
                            <ClipboardIcon
                                onClick={() => handleCopy(safetyInfo.driverEmail)}
                                className="h-6 w-6 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center border rounded-lg w-full">
                        <input
                            type="text"
                            value={safetyInfo.driverPhone}
                            readOnly
                            className="w-full p-2 pr-24 border-none rounded-l-lg"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pl-2 border-l">
                            <span className="text-gray-500 cursor-pointer" onClick={() => handleCopy(safetyInfo.driverPhone)}>Copy</span>
                            <ClipboardIcon
                                onClick={() => handleCopy(safetyInfo.driverPhone)}
                                className="h-6 w-6 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Requester Information */}
                {console.log(safetyInfo)}
            {safetyInfo?.requesterEmail !='N/A' && (
            <div className="mb-6">
                <h4 className="font-semibold mb-4">Requester Contact</h4>
                <div className="flex space-x-4">
                    <div className="relative">
                        <img 
                            src={safetyInfo.requesterAvatar}
                            alt="Requester Profile" 
                            className="h-16 w-16 rounded-full object-cover" 
                        />
                        <CheckBadgeIcon className="absolute bottom-4 right-0 text-blue-500 h-5 w-5" />
                    </div>
                    <div>
                        <div className="flex space-x-2">
                            <p className="text-lg font-semibold">Requester</p>
                            <CircleIcon className="h-3 w-3 text-green-400 fill-green-400 mt-2" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full px-2 text-sm text-green-600 bg-green-100">
                                <p>Verified</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4 w-full">
                    <div className="relative flex items-center border rounded-lg w-full">
                        <input
                            type="text"
                            value={safetyInfo.requesterEmail}
                            readOnly
                            className="w-full p-2 pr-24 border-none rounded-l-lg"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pl-2 border-l">
                            <span className="text-gray-500 cursor-pointer" onClick={() => handleCopy(safetyInfo.requesterEmail)}>Copy</span>
                            <ClipboardIcon
                                onClick={() => handleCopy(safetyInfo.requesterEmail)}
                                className="h-6 w-6 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center border rounded-lg w-full     ">
                        <input
                            type="text"
                            value={safetyInfo.requesterPhone}
                            readOnly
                            className="w-full p-2 pr-24 border-none rounded-l-lg"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pl-2 border-l">
                            <span className="text-gray-500 cursor-pointer" onClick={() => handleCopy(safetyInfo.requesterPhone)}>Copy</span>
                            <ClipboardIcon
                                onClick={() => handleCopy(safetyInfo.requesterPhone)}
                                className="h-6 w-6 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center mt-6">
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                    onClick={handleMessage}
                >
                    Send Message
                </button>
                <button 
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg shadow hover:bg-red-50"
                    onClick={handleDecline}
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default Safety;
