import { LockKeyhole } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { onGoingTripColumns, completedTripColumns } from "../ui/contants";
import Table from "../ui/Table";
import dynamic from 'next/dynamic';
import { UseGetAllRides } from "@/hooks/query/rides/getAllridesList";
import DataLoader from "../ui/dataLoader";

// Dynamically load both map components without SSR
const MapComponent = dynamic(() => import('@/components/rideMonitering/MapComponent'), {
  ssr: false,
});

const LiveCarTracking = dynamic(() => import('@/components/rideMonitering/LiveCarTracking'), {
  ssr: false,
});

export default function RideMonitoringList() {
    const [currentTopNavigationLink, setCurrentTopNavigationLink] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTrip, setSelectedTrip] = useState(null);

    // Pass status to the hook
    const { data: RidesList, isLoading, refetch } = UseGetAllRides(currentTopNavigationLink === 0 ? 'ongoing' : 'completed');

    useEffect(() => {
        refetch({
          meta: {
            status: currentTopNavigationLink === 0 ? 'ongoing' : 'completed',
          },
        });
    }, [currentTopNavigationLink]);

    const MonitoringTypes = [
        {
            type: "Ongoing Trips",
            number: RidesList?.length || 0,
        },
        {
            type: "Completed Trips",
            number: RidesList?.length || 0,
        },
    ];

    const tableConfigurations = [
        { columns: onGoingTripColumns },
        { columns: completedTripColumns },
    ];
    
    const currentConfig = tableConfigurations[currentTopNavigationLink];
    const currentRows = RidesList || [];

    const filteredAndSearchedRows = useMemo(() => {
        if (!currentConfig?.columns) return [];
        
        const filteredRows = currentRows.filter(row => {
            const searchableFields = [
                row.id?.toString(),
                row.driver?.fname,
                row.driver?.lname,
                row.pickup,
                row.destination,
                row.date,
                row.time,
                `£${row.cost}`,
                row.ride_type,
                ...(row.passengers || []).map(p => `${p.user?.fname} ${p.user?.lname}`)
            ].filter(Boolean).join(" ").toLowerCase();
            
            return searchableFields.includes(searchQuery.toLowerCase());
        });

        return filteredRows;
    }, [searchQuery, currentConfig]);

    if (isLoading) {
        return <DataLoader />;
    }

    return (
        <div className="relative px-5 min-h-screen">
            <div className="flex justify-between items-center">
                <div className="ml-4">
                    <h2 className="font-semibold text-lg">Ride Monitoring</h2>
                    <p className="text-sm">View and manage all rides, live tracking.</p>
                </div>
                <div>
                    <button className="bg-[#4E5BA6] text-white rounded-md px-2 py-2 flex">
                        <LockKeyhole className="mr-2" />
                        Safety Button
                    </button>
                </div>
            </div>

            {/* Monitoring Type Navigation */}
            <div className="space-y-1 mt-4 w-full xl:w-[60%] flex space-x-2 px-4 py-2 ring-gray-900/10">
                {MonitoringTypes.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentTopNavigationLink(index)}
                        className={`flex gap-2 ease-in-out duration-300 cursor-pointer ${
                            currentTopNavigationLink === index
                                ? "shadow-lg text-black ring-1 ring-gray-900/10"
                                : "text-gray-500"
                        } rounded-md items-center py-2 px-2 text-xs lg:text-sm font-semibold`}
                    >
                        <p>{item.type}</p>
                    </div>
                ))}
            </div>

            {/* Map for Live Tracking - Only show for ongoing trips */}
            {currentTopNavigationLink === 0 && (
                <div className="my-6">
                    <h2 className="font-semibold text-lg mb-4">Live Trip Tracking</h2>
                    {selectedTrip ? (
                        <div className="space-y-4">
                            <button 
                                onClick={() => setSelectedTrip(null)}
                                className="text-white bg-lightgreen rounded-md px-2 py-2 hover:text-green-800"
                            >
                                ← Back to All Trips
                            </button>
                            <LiveCarTracking trip={selectedTrip} />
                        </div>
                    ) : (
                        <MapComponent 
                            trips={currentRows} 
                            onTripSelect={setSelectedTrip}
                        />
                    )}
                </div>
            )}

            {/* Search Bar */}
            <div className="flex justify-end">
                <div className="flex w-80 mr-6 relative border rounded-lg shadow-sm">
                    <SearchIcon className="absolute left-2 top-2 h-6 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search trips..."
                        className="px-4 py-2 w-full focus:outline-none ml-6"
                    />
                </div>
            </div>

            {/* Table */}
            <Table 
                rows={filteredAndSearchedRows} 
                columns={currentConfig.columns} 
                hoverColor={'#FEE4E2'} 
                loading={isLoading}
            />
        </div>
    );
}
