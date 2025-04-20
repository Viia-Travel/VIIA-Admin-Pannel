import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import DeleteBookingModal from "./DeleteBookingModal";
import EditBookingModal from "./EditBooking";
import { CircleIcon, CheckCircleIcon, StarIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import DriverDetails, { PassengerDetails } from "./DriverPassengerDetails";

const ViewBookingModal = ({ isOpen, onClose, data, userType }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };


    const getHeading = () => {
        switch (userType) {
            case "booking":
                return "View Booking Details";
            case "Requested":
                return "Requested Rides Details";
            case "Published":
                return "Published Rides Details";
            default:
                return "Booking Details";
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" className="rounded-xl">
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{getHeading()}</h3>
                        <button onClick={onClose}>
                            <svg className="h-6 w-6 cursor-pointer text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </DialogTitle>
                <div className="p-6 space-y-3">

                    {/* Driver's Details */}
                    {userType !== 'Requested' && data?.driver &&
                        <DriverDetails driver={data?.driver} />
                    }
                    {/* passengers Detaiil */}
                    {userType !== 'Published' && data?.passengers?.length > 0 &&
                        <PassengerDetails passenger={data?.passengers} userType={userType} />
                    }
                    {/* Ride Details */}
                    <div className="space-y-2 font-semibold text-base">
                        <div className="">
                            <p className="text-sm font-normal">Pickup Point:</p>
                            <p>{data.pickup}</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-sm font-normal">Destination:</p>
                            <p>{data.destination}</p>
                        </div>

                        <div className="grid grid-cols-2 space-y-4">
                            {data?.car_space &&
                                <div className="">
                                    <p className="text-sm font-normal">Seats:</p>
                                    <p>{data?.car_space}</p>
                                </div>
                            }
                            <div>
                                <p className="text-sm font-normal">Price:</p>
                                <p>{data.cost}</p>
                            </div>
                            <div>
                                <p className="text-sm font-normal">Date:</p>
                                <p>{data.date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-normal">Time:</p>
                                <p>{data.time}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="text-sm text-red-700 px-3 py-2 bg-white border border-gray-300 rounded-md"
                            onClick={handleDelete}
                        >
                            Delete Booking
                        </button>
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                        >
                            Edit Booking
                        </button>
                    </div>
                </div>
            </Dialog>

            {/* Modals */}
            <EditBookingModal data={data} onClose={() => setShowEditModal(false)} isOpen={showEditModal} />
            <DeleteBookingModal data={data} onClose={() => setShowDeleteModal(false)} isOpen={showDeleteModal} />
        </>
    );
};

export default ViewBookingModal;
