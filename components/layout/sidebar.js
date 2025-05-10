import React, { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Sidebar = ({ mobileNavsidebar, sidebarOpen, setSidebarOpen }) => {
    const sidebarRef = useRef(null);
    const router = useRouter();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", current: false, img: "/assets/dashboard.svg" },
        { name: "Users", href: "/user-management", current: false, img: "/assets/users.svg" },
        { name: "Ride Monitoring", href:"/ride-monitering" , current: false, img: "/assets/car.svg" , baseUrl: "/ride-monitering"},
        { name: "Bookings",href: "/bookings", current: false, img: "/assets/booking.svg" },
        { name: "Payments", href: "/payments", current: false, img: "/assets/payment.svg" },
        { name: "Ratings & Reports", href: "/ratings",current: false, img: "/assets/rating.svg" },
        { name: "Analytics",href: "/analytics", current: false, img: "/assets/analytics.svg" },
        { name: "Support & Helpdesk", href: "/support" , current: false, img: "/assets/support.svg" },
        { name: "Notifications", href: "/notifications", current: false, img: "/assets/notification.svg" },
    ];

    return (
        <>
            <aside
                className={`${mobileNavsidebar ? "block" : "hidden"
                    } sm:flex sm:flex-col z-50`}
                ref={sidebarRef}
            >
                <div className="flex h-full">
                    {/* Static sidebar for desktop */}
                    <div className="hidden lg:fixed lg:inset-y-0 lg:flex min-h-screen sm:w-64 bg-white  lg:flex-col">
                        <div className="flex flex-grow flex-col overflow-y-auto border-r">
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex flex-1 rounded-tl-lg flex-col  text-black">
                                <div className="flex flex-1 h-auto flex-col overflow-y-auto py-2  my-3 ">
                                    <div>
                                        <div className=" items-center pl-2 flex justify-start">
                                            <Image src="../../assets/logo.svg" height={6600} width={4500} alt="logo" className="w-20 h-20" />
                                        </div>
                                    </div>
                                    <nav className="mt-4 flex-1" aria-label="Sidebar">
                                        <div className="space-y-2 mx-2">
                                            {navigation.map((item) => (
                                                <div key={item.name} className="">
                                                    {item.href ? (
                                                        <div
                                                            onClick={() => router.push(`${item.href}`)}
                                                            className={`${item.href === router.pathname ? 'bg-primary-600 text-white' : ''
                                                                } hover:text-white gap-4 rounded-lg flex space-x-2 ease-in-out duration-300 hover:bg-primary-500 p-2 cursor-pointer`}
                                                        >
                                                            <img className="h-6 w-6" src={item.img} alt={item.name} />
                                                            <div className="grid grid-cols-12">
                                                                <div className="col-span-11">
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="gap-4 rounded-lg flex space-x-2 p-2 cursor-not-allowed opacity-50"
                                                        >
                                                            <img className="h-6 w-6" src={item.img} alt={item.name} />
                                                            <div className="grid grid-cols-12">
                                                                <div className="col-span-11">
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
