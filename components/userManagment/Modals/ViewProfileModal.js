import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import DeactivateUserModal from "./DeactivatingUser";
import ReActivatingUserModal from "./ReactiveUserModal";
import VerficationReminderModal from "./VerficationReminder";
import { CheckBadgeIcon, ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import FlagUserModal from "./FlaggingUser";
import UnFlaggingUserModal from "./UnFlaggingUser";
import VerifyUserModal from "./VerifyUserModal";
import EditUserModal from "./EditUserModal";
import { Dialog, DialogTitle } from "@mui/material";
import { UseGetProfile } from "@/hooks/query/getProfile";

import { CircularProgress } from "@mui/material"; // MUI spinner

const ViewProfileModal = ({ data: profile, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("about");
    const { data: ProfileData, isLoading } = UseGetProfile(profile.id);
    const [activeInnerModal, setActiveInnerModal] = useState(null);

    const handleCloseModal = () => onClose();
    const handleTabClick = (tab) => setActiveTab(tab);
    const handleInnerModalClose = () => setActiveInnerModal(null);
    const handleOpenInnerModal = (modalType) => setActiveInnerModal(modalType);

    const dummyData = {
        coverPicture: "/assets/cover.svg",
        isVerified: true,
        bio: "Driver | Passenger",
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" className="rounded-lg">
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">View User Profile</h3>
                        <button onClick={onClose}>
                            <svg className="h-6 w-6 cursor-pointer text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </DialogTitle>

                <div className="p-4 h-[700px] overflow-y-scroll">
                    {/* Loader */}
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <CircularProgress />
                        </div>
                    ) : ProfileData ? (
                        <>
                            {/* Profile Header */}
                            <div className="px-3 flex flex-col justify-center items-center my-4">
                                <div className="relative w-full">
                                    <img src={dummyData.coverPicture} alt="Cover" className="w-full object-fill" />
                                    <div className="flex flex-col items-start relative">
                                        <div className="absolute left-10 -top-12 pl-3 transform -translate-x-1/2">
                                            <img
                                                src={ProfileData?.avatar}
                                                alt="Profile"
                                                className="w-28 h-28 rounded-full "
                                            />
                                            {dummyData.isVerified && (
                                                <CheckBadgeIcon className="absolute bottom-4 -right-2 h-6 w-6 text-blue-500" />
                                            )}
                                        </div>

                                        <div className="mt-16">
                                            <h3 className="text-lg font-semibold">{ProfileData.fname + ' ' + ProfileData.lname}</h3>
                                            <div className="text-gray-500 flex space-x-3">
                                                <p>Driver | Passenger</p>
                                                <p>
                                                    <span className={`${profile.VerificationStatus === "verified"
                                                        ? "bg-primary-200 text-primary-600"
                                                        : "bg-gray-200"
                                                        } rounded-full px-2 `}>
                                                        {profile.VerificationStatus}
                                                    </span>
                                                </p>
                                                {profile?.deactivated ? (
                                                    <span className="bg-red-100 rounded-full px-2 text-sm text-red-700 capitalize">
                                                        Deactivated
                                                    </span>
                                                ) : (
                                                    profile?.flagged === 'flagged' && (
                                                        <p className="flex items-center">
                                                            <span className="bg-[#F3FEE7] rounded-full px-2 text-sm text-green-700 capitalize">
                                                                {profile.flagged}
                                                            </span>
                                                            <img src="/assets/flag.svg" className="h-5 w-5 ml-2" />
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-3">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex">
                                        {["about", "passenger", "driver"].map(tab => (
                                            <button
                                                key={tab}
                                                className={`mr-8 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === tab
                                                    ? "border-indigo-500 text-indigo-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                    }`}
                                                onClick={() => handleTabClick(tab)}
                                            >
                                                {tab === "about" ? "About" : `Trip as ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="mt-4">
                                    {activeTab === "about" && <AboutTab profile={ProfileData} />}
                                    {activeTab === "passenger" && <TripAsPassengerTab />}
                                    {activeTab === "driver" && <TripAsDriverTab />}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end mt-8 sticky -bottom-4 bg-white py-3">
                                    <div className="space-x-4">
                                        {profile.Flagged !== "flag" && (
                                            <button className="text-sm font-semibold text-red-500 hover:text-red-600"
                                                onClick={() => handleOpenInnerModal("Deactivate")}>
                                                Deactivate
                                            </button>
                                        )}
                                        {profile.VerificationStatus === "verified" ? (
                                            <button className="text-sm text-black px-3 py-2 bg-white border-2 rounded-md"
                                                onClick={() => handleOpenInnerModal("Edit")}>
                                                Edit
                                            </button>
                                        ) : (
                                            <button className="text-sm text-white px-3 py-2 bg-red-500 rounded-md"
                                                onClick={() => handleOpenInnerModal("VerificationReminder")}>
                                                Verification Reminder
                                            </button>
                                        )}
                                        {profile.deactivated ? (
                                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                                                onClick={() => handleOpenInnerModal("Reactivate")}>
                                                Re-activate User
                                            </button>
                                        ) : profile.Flagged !== "flag" ? (
                                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                                                onClick={() => handleOpenInnerModal("Verify")}>
                                                Verify User
                                            </button>
                                        ) : (
                                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                                                onClick={() => handleOpenInnerModal("Unflag")}>
                                                Unflag User
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No profile data found.</p>
                    )}
                </div>
            </Dialog>

            {/* Modals */}
            {activeInnerModal === "Verify" && <VerifyUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "Edit" && <EditUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "Deactivate" && <DeactivateUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "Reactivate" && <ReActivatingUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "VerificationReminder" && <VerficationReminderModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "Flag" && <FlagUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
            {activeInnerModal === "Unflag" && <UnFlaggingUserModal data={profile} isOpen onClose={handleInnerModalClose} />}
        </>
    );
};


export default ViewProfileModal;


const AboutTab = ({ profile }) => {
    const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false);
    const handleCarDetailsToggle = () => {
        setIsCarDetailsOpen(!isCarDetailsOpen);
    };

    const data = {
        coverPicture: '/assets/cover.svg',
        profilePicture: '/assets/user.svg',
        isVerified: true,
        name: 'John Doe',
        bio: 'Driver | Passenger',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        dob: 'January 1, 1980',
        gender: 'Male',
        activeStatus: 'Active',
        rideCount: 123,
        registrationDate: 'January 1, 2020',
        verificationDate: 'February 1, 2020',
        carDetails: {
            model: 'Green Toyota Prius 2023',
            licenseNumber: 'SYV-0937BVC',
            color: 'Green',
            feature: '/assets/car_info.svg',
        },
        driverPreferences: [
            { label: 'You can smoke', icon: '/assets/smoke.svg' },
            { label: 'Love to chat', icon: '/assets/chat.svg' },
            { label: 'No music', icon: '/assets/music.svg' },
        ],
        topPreferences: [
            { label: 'Mountain climbing', icon: '/assets/mountains.svg' },
            { label: 'Boxing', icon: '/assets/boxing.svg' },
            { label: 'Driving', icon: '/assets/diving.svg' },
            { label: 'Paragliding', icon: '/assets/paragliding.svg' },
        ],
    };

    const carDetails = {
        carName: {
            label: "Car Name",
            value: "Toyota Camry XLE",
        },
        carColor: {
            label: "Car Colour",
            value: "Silver",
        },
        engineCapacity: {
            label: "Engine Capacity",
            value: "2.5L",
        },
        fuelType: {
            label: "Fuel Type",
            value: "Petrol",
        },
        make: {
            label: "Make",
            value: "Toyota",
        },
        monthOfRegistration: {
            label: "Month of Registration",
            value: "December 2004",
        },
        registrationNumber: {
            label: "Registration Number",
            value: "ABC1234",
        },
        revenueWeight: {
            label: "Revenue Weight",
            value: "1640 kg",
        },
        taxDueDate: {
            label: "Tax Due Date",
            value: "4 January 2007",
        },
        taxStatus: {
            label: "Tax Status",
            value: "Paid",
        },
        wheelPlan: {
            label: "Wheel Plan",
            value: "4-Wheel",
        },
        yearOfManufacture: {
            label: "Year of Manufacture",
            value: "2004",
        },
        euroStatus: {
            label: "Euro Status",
            value: "Euro 4",
        },
        realDrivingEmissons: {
            label: "Real Driving Emissions",
            value: "1 g/km",
        },
        DateofLastV5CIssued: {
            label: "Date of Last V5C Issued",
            value: "1 January 2007",
        },
        licenseNumber: {
            label: "License Number",
            value: "123456789",
        },
    };

    return (
        <div>

            <div className="grid grid-cols-2 gap-x-40 gap-y-3 w-full">
                <div>
                    <p className="font-semibold">Email:</p>
                    <p>{profile?.email}</p>
                </div>
                <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{profile?.phone}</p>
                </div>
                <div>
                    <p className="font-semibold">Date of Birth:</p>
                    <p>
                        {profile?.dob
                            ? new Date(profile.dob).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                            })
                            : "—"}
                    </p>
                </div>

                <div>
                    <p className="font-semibold">Gender:</p>
                    <p>{profile?.gender}</p>
                </div>
                {profile?.VerificationStatus == 'verified' && profile?.Flagged !== 'flag' &&
                    <>
                        <div>
                            <p className="font-semibold">Active Status:</p>
                            <p>{profile?.activeStatus}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Ride Count:</p>
                            <p>{profile?.rideCount}</p>
                        </div>
                    </>
                }
                <div>
                    <p className="font-semibold">Registration Date:</p>
                    {profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })
                        : "—"}

                </div>
                {profile?.VerificationStatus !== 'verified' && profile?.Flagged !== 'flag' &&
                    <div>

                    </div>
                }
                {profile?.VerificationStatus == 'verified' &&

                    <div>
                        <p className="font-semibold">Verification Date:</p>
                        <p>{profile?.verificationDate}</p>
                    </div>
                }
                {/* Date flagged and reason flaged */}

                {profile?.deactivated ?
                    <>
                        <div className="col-span-2 text-red-700">
                            <p className="font-semibold">Date Deactivated</p>
                            <p >{profile?.DateDeactivated}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Reason of Deactivation</p>
                            <p>{profile?.ReasonForDeactivation}</p>
                        </div>
                    </>
                    : profile?.Flagged == 'flag' &&
                    <>
                        <div className="col-span-2">
                            <p className="font-semibold">DateFlagged</p>
                            <p>{profile?.DateFlagged}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Reason of Flagged</p>
                            <p>{profile?.ReasonForFlagging}</p>
                        </div>
                    </>
                }


                {profile?.VerificationStatus == 'verified' && profile?.Flagged !== 'flag' &&
                    <>
                        <div className="">
                            <p className="font-semibold">Car Details:</p>
                            <p>{data.carDetails?.model}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <img src={data?.carDetails.feature} alt="Feature" className="ml-3 " />
                        </div>
                        <div>
                            <p className="font-semibold">License Number:</p>
                            <p>{data?.carDetails.licenseNumber}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Car Color:</p>
                            <p>{data.carDetails.color}</p>
                        </div>

                    </>
                }
                <div className=" mt-4">
                    <p className="font-semibold">Driver Preferences:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile?.preferences?.map((preference, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-primary-500 text-white rounded-md px-2 py-1 gap-2"
                            >
                                <img
                                    src={`/assets/${preference.icon}.svg`}
                                    alt={preference.icon}
                                    className="w-4 h-4"
                                />
                                <p>{preference.description}</p>
                            </div>
                        ))}
                    </div>


                </div>
                <div className=" mt-4">
                    <p className="font-semibold">Top Preferences:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile?.interests?.map((preference, index) => (
                            <div key={index} className="flex items-center bg-[#D6BBFB] text-black rounded-md px-2 py-1">
                                <p className="" > {preference.icon}</p>
                                <p>{preference.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {profile?.VerificationStatus == 'verified' &&
                    <div className="col-span-2">
                        <div className="flex items-center border-t-2 justify-between cursor-pointer pt-4" onClick={handleCarDetailsToggle}>
                            <p className="font-semibold text-lg">Full Car details (DVLA):</p>
                            {isCarDetailsOpen ? (
                                <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                            ) : (
                                <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                            )}
                        </div>
                        {isCarDetailsOpen && (
                            <div className="grid grid-cols-2 mt-2 gap-4">
                                {Object.entries(carDetails).map(([key, { label, value }]) => (
                                    <div key={key} className="mb-2">
                                        <p className="text-base font-medium text-gray-700">
                                            {label}
                                        </p>
                                        <p className="text-sm text-gray-600">{value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}
const TripAsPassengerTab = () => {

    const ratings = [
        { stars: 5, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ", user: "Alice", age: 22 },
        { stars: 4, review: "Comfortable and quick.", user: "Bob", age: 12 },
        { stars: 2, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ", user: "Alice", age: 22 },
        { stars: 3, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ", user: "Alice", age: 22 },
        { stars: 2, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,", user: "Alice", age: 22 },
        // Add more dummy ratings here
    ];

    const pastTrips = [
        {
            day: "Monday",
            date: "June 1, 2023",
            startPoint: 'Manchester',
            endPoint: 'London',
            startTime: '9:08 AM',
            endTime: '9:56 AM',
            avatar: "/assets/user.svg",
            name: "John Doe",
            rating: 4,
            price: 35
        },
        {
            day: "Monday",
            date: "June 1, 2023",
            startPoint: 'Manchester',
            endPoint: 'London',
            startTime: '9:08 AM',
            endTime: '9:56 AM',
            avatar: "/assets/user.svg",
            name: "John Doe",
            rating: 4,
            price: 32
        },
        // Add more dummy past trips here
    ];

    return (
        <div>
            <div className="mb-4">
                <h4 className="font-semibold">Ratings & Reviews</h4>
                <div className="flex items-center my-2">
                    {Array(5)
                        .fill(3)
                        .map((_, i) => (
                            <StarIcon key={i} className="h-8 w-8 text-yellow-500" />
                        ))}
                    <span className="ml-3">({ratings.length} reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {ratings.map((rating, index) => (
                        <div key={index} className="p-4 border rounded-md">
                            <div className="flex space-x-2 items-center">
                                <p className="text-sm font-semibold">{rating.user}</p>
                                <p className="text-xs text-gray-400">{rating.age} yrs</p>
                                <div className="flex">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            i < rating.stars ? (
                                                <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                                            ) : (
                                                <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                                            )
                                        ))}
                                </div>
                            </div>
                            <p className="text-sm text-wrap">{rating.review}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold">Past Trips</h4>
                <div className="grid grid-cols-1 gap-4">
                    {pastTrips.map((trip, index) => (
                        <div key={index} className="p-4 border rounded-md flex justify-between items-center">
                            <p className="text-sm font-semibold">{trip.day}, {trip.date}</p>
                            <div>

                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <p className="text-sm">{trip.startTime}</p>
                                        <p className="text-sm">{trip.startPoint}</p>
                                    </div>
                                    <ArrowRightIcon className="w-5 h-5" />
                                    <div className="ml-4">
                                        <p className="text-sm">{trip.endTime}</p>
                                        <p className="text-sm">{trip.endPoint}</p>
                                    </div>
                                    <p className="font-semibold text-2xl text-gray-500 ml-3 mb-4"> £{trip.price}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <img
                                    src={trip.avatar}
                                    alt={trip.name}
                                    className="w-12  h-12 rounded-full "
                                />
                                <div>
                                    <p className="text-base text-gray-800 font-semibold">{trip.name}</p>
                                    <p className="text-sm text-gray-800">{trip.rating}/5</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};


const TripAsDriverTab = () => {
    const ratings = [
        { stars: 5, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ", user: "Alice", age: 22 },
        { stars: 4, review: "Comfortable and quick.", user: "Bob", age: 12 },

    ];

    const pastTrips = [
        {
            day: "Monday",
            date: "June 1, 2023",
            startPoint: 'Manchester',
            endPoint: 'London',
            startTime: '9:08 AM',
            endTime: '9:56 AM',
            avatar: "/assets/user.svg",
            name: "John Doe",
            rating: 4,
            price: 35
        },
        {
            day: "Monday",
            date: "June 1, 2023",
            startPoint: 'Manchester',
            endPoint: 'London',
            startTime: '9:08 AM',
            endTime: '9:56 AM',
            avatar: "/assets/user.svg",
            name: "John Doe",
            rating: 4,
            price: 35
        },
        {
            day: "Monday",
            date: "June 1, 2023",
            startPoint: 'Manchester',
            endPoint: 'London',
            startTime: '9:08 AM',
            endTime: '9:56 AM',
            avatar: "/assets/user.svg",
            name: "John Doe",
            rating: 4,
            price: 32
        },
        // Add more dummy past trips here
    ];

    return (
        <div>
            <div className="mb-4">
                <h4 className="font-semibold">Ratings & Reviews</h4>
                <div className="flex items-center my-2">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <StarIcon key={i} className="h-8 w-8 text-yellow-500" />
                        ))}
                    <span className="ml-3">({ratings.length} reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {ratings.map((rating, index) => (
                        <div key={index} className="p-4 border rounded-md">
                            <div className="flex space-x-2 items-center">
                                <p className="text-sm font-semibold">{rating.user}</p>
                                <p className="text-xs text-gray-400">{rating.age} yrs</p>
                                <div className="flex">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            i < rating.stars ? (
                                                <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                                            ) : (
                                                <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                                            )
                                        ))}
                                </div>
                            </div>
                            <p className="text-sm text-wrap">{rating.review}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold">Past Trips</h4>
                <div className="grid grid-cols-1 gap-4">
                    {pastTrips.map((trip, index) => (
                        <div key={index} className="p-4 border rounded-md flex justify-between items-center">
                            <p className="text-sm font-semibold">{trip.day}, {trip.date}</p>
                            <div>

                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <p className="text-sm">{trip.startTime}</p>
                                        <p className="text-sm">{trip.startPoint}</p>
                                    </div>
                                    <ArrowRightIcon className="w-5 h-5" />
                                    <div className="ml-4">
                                        <p className="text-sm">{trip.endTime}</p>
                                        <p className="text-sm">{trip.endPoint}</p>
                                    </div>
                                    <p className="font-semibold text-2xl text-gray-500 ml-3 mb-4"> £{trip.price}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <img
                                    src={trip.avatar}
                                    alt={trip.name}
                                    className="w-12 h-12 rounded-full "
                                />
                                <div>
                                    <p className="text-base text-gray-800 font-semibold">{trip.name}</p>
                                    <p className="text-sm text-gray-800">{trip.rating}/5</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

