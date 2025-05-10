import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";
import ViewTripInformation from "./modals/ViewTripInformation";
import { useRouter } from "next/router";


export default function RideMenu({ data, userType }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter()

    const handleOpenMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleViewInformation = () => {
        setActiveOption("View Trip Information");
        setModalOpen(true);
    };

    const handleLiveTracking = () => {
        router.push(`/ride-monitering/live-tracking?id=${data.id}`)
    };



    let filterMenuOptions = [];
    let modalComponents = {};

    switch (userType) {

        case "ongoing":
            filterMenuOptions = ["View Trip Information", "Live Tracking"];
            modalComponents = {
                "View Trip Information": handleViewInformation,
                "Live Tracking": handleLiveTracking,
            };
            break;

        case "complete":
            filterMenuOptions = ["View Trip Information"];
            modalComponents = {
                "View Trip Information": handleViewInformation,

            };
            break;
        default:
            break;
    }

    const handleMenuItemClick = (menuItem) => {
        modalComponents[menuItem]();
        handleCloseMenu();

    };

    return (
        <>

            <div>
                <EllipsisVertical onClick={handleOpenMenu} className="cursor-pointer" />
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    {filterMenuOptions.map((item) => (
                        <MenuItem key={item} onClick={() => handleMenuItemClick(item)}>
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            {/* Conditional rendering of modals based on activeOption */}
            {activeOption === "View Trip Information" && (
                <ViewTripInformation data={data} isOpen={modalOpen} onClose={() => setModalOpen(false)}  userType={userType}/>
            )}
          
        </>
    );
}
