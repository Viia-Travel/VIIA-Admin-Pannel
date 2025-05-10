import React from "react";

const CarDetails = ({ carData }) => {
    // Get the vehicle make and use it to construct the image URL
    const getCarImage = (make) => {
        // You can replace this with your actual image URL construction logic
        // For now, we'll use a placeholder service that generates car images based on make
        return `https://via.placeholder.com/300x200?text=${make}`;
    };

    return (
        <div className="p-4">
            <h4 className="font-semibold text-lg mb-4">Car Details</h4>
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    {/* <div>
                        <img
                            src={getCarImage(carData.model)}
                            alt={`${carData.model} car`}
                            className="w-full h-44 object-cover rounded-lg"
                        />
                    </div> */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Additional car images can be added here if available in the data */}
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                            <span className="text-gray-500">No additional images available</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                            <span className="text-gray-500">No additional images available</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 space-y-4">
                    <div className="flex space-x-8">
                        <div>
                            <p className="font-semibold">Car Model:</p>
                            <p className="text-gray-700">{carData.model}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Car Color:</p>
                            <p className="text-gray-700">{carData.color}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">License Number:</p>
                        <p className="text-gray-700">{carData.licenseNumber}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">Vehicle Information</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
