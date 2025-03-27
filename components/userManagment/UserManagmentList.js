import React, { useState } from "react";
import Table from "../ui/Table";

import DashboardCards from "../dashboard/dashboardCards";
import { allUsersColumns, unVerifiedUserColumns, deactivatedUserColumns, flaggedUserColumns } from "../ui/contants";
import { SearchIcon,  ListFilter } from "lucide-react";
import { UseGetUserList } from "@/hooks/query/users/getUserList";
import { UseGetVerificationDocs } from "@/hooks/query/users/getVerificationdoc";

const UserManagementList = () => {
  const [currentTopNavigationLink, setCurrentTopNavigationLink] = useState(0);
  const {data:UserList ,isLoadingUser}=UseGetUserList()
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    userType: null,
    verificationStatus: null,
    gender: null,
    activeStatus: null,
    flagStatus: null,
  });


  const unVerifiedUserRows = [
    {
      id: 1,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "unverified",
    },
    {
      id: 2,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 3,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 4,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 5,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 6,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 7,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 8,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 9,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
    {
      id: 10,
      Email: "Snow",
      FullName: "Jon",
      PhoneNumber: "347324893",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      RegDate: "20 October 2021",
      UserType: "Driver",
      ActiveStatus: "Active",
      RidesCount: 10,
      VerificationStatus: "verified",
    },
  ];

  const deactivatedUserRows = [
    {
      id: 1,
      Email: "Snow",
      FullName: "Jon",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      Flagged: "flag",
      RegDate: "20 October 2021",
      VerificationStatus: "verified",
      UserType: "Driver",
      deactivated: 'true',
      ReasonForDeactivation: "Dangerous driving",
      DateDeactivated: "2 June 2023",
    },
    {
      id: 2,
      Email: "Snow",
      FullName: "Jon",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      Flagged: "flag",
      VerificationStatus: "verified",
      RegDate: "20 October 2021",
      UserType: "Driver",
      deactivated: 'true',
      ReasonForDeactivation: "Dangerous driving",
      DateDeactivated: "2 June 2023",
    },
    {
      id: 3,
      Email: "Snow",
      FullName: "Jon",
      DateRegistered: "2 June 2023",
      Gender: "Male",
      Flagged: "flag",
      VerificationStatus: "verified",
      RegDate: "20 October 2021",
      UserType: "Driver",
      deactivated: 'true',
      ReasonForDeactivation: "Dangerous driving",
      DateDeactivated: "2 June 2023",
    },

  ];

  const flaggedUserRows = [
    {
      id: 1,
      Email: "Snow",
      FullName: "Jon",
      DateFlagged: "2 June 2023",
      ReasonForFlagging: "Dangerous driving",
      Flagged: "flagged",
      VerificationStatus: "verified",
      UserType: "Driver",
    },
    {
      id: 2,
      Email: "Snow",
      FullName: "Jon",
      DateFlagged: "2 June 2023",
      ReasonForFlagging: "Dangerous driving",
      Flagged: "flag",
      VerificationStatus: "verified",
      UserType: "Driver",
    },
    {
      id: 3,
      Email: "Snow",
      FullName: "Jon",
      DateFlagged: "2 June 2023",
      ReasonForFlagging: "Dangerous driving",
      Flagged: "flag",
      VerificationStatus: "verified",
      UserType: "Driver",
    },
    {
      id: 4,
      Email: "Snow",
      FullName: "Jon",
      DateFlagged: "2 June 2023",
      ReasonForFlagging: "Dangerous driving",
      Flagged: "flag",
      VerificationStatus: "verified",
      UserType: "Driver",
    },
    {
      id: 5,
      Email: "Snow",
      FullName: "Jon",
      DateFlagged: "2 June 2023",
      ReasonForFlagging: "Dangerous driving",
      Flagged: "flag",
      VerificationStatus: "verified",
      UserType: "Driver",
    },

  ];

  const userCards = [
    {
      name: "Registered Users",
      number: "8.8k",
    },
    {
      name: "Drivers",
      number: "900",
    },
    {
      name: "Passengers",
      number: "7.9k",
    },
    {
      name: "Active Users",
      number: "8.8k",
    },
  ];

  const usersTypes = [
    {
      type: "All Users",
      number: 2,
    },
    {
      type: "Unverified",
      number: 1,
    },
    {
      type: "Deactivated Users",
      number: 1,
    },
    {
      type: "Flagged Users",
      number: 1,
    },
  ];

  const tableConfigurations = [
    { rows: UserList, columns: allUsersColumns },
    { rows: unVerifiedUserRows, columns: unVerifiedUserColumns },
    { rows: deactivatedUserRows, columns: deactivatedUserColumns },
    { rows: flaggedUserRows, columns: flaggedUserColumns },
  ];

  const currentConfig = tableConfigurations[currentTopNavigationLink];

  const applyFilters = () => {
    if (!currentConfig.rows || currentConfig.rows.length === 0) return []; // Handle empty or undefined data
  
    let filtered = currentConfig.rows;
  
    if (filters.userType) {
      filtered = filtered.filter(row => row.UserType === filters.userType);
    }
    if (filters.verificationStatus) {
      filtered = filtered.filter(row => row.VerificationStatus === filters.verificationStatus);
    }
    if (filters.gender) {
      filtered = filtered.filter(row => row.Gender === filters.gender);
    }
    if (filters.activeStatus) {
      filtered = filtered.filter(row => row.ActiveStatus === filters.activeStatus);
    }
    if (filters.flagStatus) {
      filtered = filtered.filter(row => row.Flagged === filters.flagStatus);
    }
  
    return filtered;
  };
  

  const filteredAndSearchedRows = currentConfig?.rows?.length
  ? applyFilters().filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  : [];


  const handleFilterChange = (category, value) => {
    setFilters({
      ...filters,
      [category]: value,
    });
  };

  const clearFilter = (category) => {
    setFilters({
      ...filters,
      [category]: null,
    });
  };

  return (
    <div className="relative px-5 min-h-screen">
      <div className="flex space-y-1 w-full xl:w-[60%] justify-between px-4 py-2 ring-gray-900/10">
        {usersTypes?.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurrentTopNavigationLink(index)}
            className={`flex gap-2 ease-in-out duration-300 cursor-pointer ${currentTopNavigationLink === index
              ? "shadow-lg text-black ring-1 ring-gray-900/10"
              : "text-gray-500"
              } rounded-md items-center py-2 px-2 text-xs lg:text-sm font-semibold`}
          >
            <p>{item?.type}</p>
            <p className="w-12 h-7 flex relative items-center justify-center bg-[#F2F4F7] rounded-full">
              {item?.number}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-6 w-full xl:w-[90%]">
        {userCards?.map((item, index) => (
          <div key={index} className="w-full">
            <DashboardCards
              title={item?.name}
              number={item?.number}
              toolTipText={`Total number of ${item.name} on the platform.`}
              toolTipheading={item.name}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 ">
        <div className="flex justify-between relative">

          <div className="flex space-x-2">
            {!isFilterOpen &&
              <div className="flex gap-2 ">
                {Object.keys(filters).map((category) => {
                  if (filters[category]) {
                    return (
                      <div key={category} className="flex items-center gap-2 bg-white border-gray-300 font-semibold text-black border px-2 py-1 rounded-lg">
                        <span>{`${filters[category]}`}</span>
                        <button onClick={() => clearFilter(category)} className="text-gray-600 hover:text-gray-800">
                          &times;
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            }
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-1 flex space-x-1 bg-white text-black font-semibold border rounded-lg "
            >
              <ListFilter className="h-6 w-6 mt-1 mr-3" />
              More Filters
            </button>

          </div>

          {isFilterOpen && (
            <div className="border p-4 rounded-lg bg-white shadow-lg mb-4 absolute top-10 left-6 w-[80%] z-50">
              <h2 className="font-semibold text-2xl mb-3">
                Filters
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="mb-2">
                  <h4 className="font-semibold">User Type</h4>
                  <div className="flex flex-col space-y-1">
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="Driver"
                        checked={filters.userType === "Driver"}
                        onChange={(e) => handleFilterChange("userType", e.target.value)}
                      />{" "}
                      Driver
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="Passenger"
                        checked={filters.userType === "Passenger"}
                        onChange={(e) => handleFilterChange("userType", e.target.value)}
                      />{" "}
                      Passenger
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold">Verification Status</h4>
                  <div className="flex flex-col space-y-1">
                    <label>
                      <input
                        type="radio"
                        name="verificationStatus"
                        value="verified"
                        checked={filters.verificationStatus === "verified"}
                        onChange={(e) => handleFilterChange("verificationStatus", e.target.value)}
                      />{" "}
                      Verified
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="verificationStatus"
                        value="unverified"
                        checked={filters.verificationStatus === "unverified"}
                        onChange={(e) => handleFilterChange("verificationStatus", e.target.value)}
                      />{" "}
                      Unverified
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="verificationStatus"
                        value="deactivated"
                        checked={filters.verificationStatus === "deactivated"}
                        onChange={(e) => handleFilterChange("verificationStatus", e.target.value)}
                      />{" "}
                      Deactivated
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="mb-2">
                  <h4 className="font-semibold">Gender</h4>
                  <div className="flex flex-col space-y-1">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={filters.gender === "Male"}
                        onChange={(e) => handleFilterChange("gender", e.target.value)}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={filters.gender === "Female"}
                        onChange={(e) => handleFilterChange("gender", e.target.value)}
                      />{" "}
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={filters.gender === "Other"}
                        onChange={(e) => handleFilterChange("gender", e.target.value)}
                      />{" "}
                      Other
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold">Active Status</h4>
                  <div className="flex flex-col space-y-1">
                    <label>
                      <input
                        type="radio"
                        name="activeStatus"
                        value="Active"
                        checked={filters.activeStatus === "Active"}
                        onChange={(e) => handleFilterChange("activeStatus", e.target.value)}
                      />{" "}
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="activeStatus"
                        value="Inactive"
                        checked={filters.activeStatus === "Inactive"}
                        onChange={(e) => handleFilterChange("activeStatus", e.target.value)}
                      />{" "}
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold">Flag Status</h4>
                  <div className="flex flex-col space-y-1">
                    <label>
                      <input
                        type="radio"
                        name="flagStatus"
                        value="flag"
                        checked={filters.flagStatus === "flag"}
                        onChange={(e) => handleFilterChange("flagStatus", e.target.value)}
                      />{" "}
                      Flagged
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="flagStatus"
                        value="unflag"
                        checked={filters.flagStatus === "unflag"}
                        onChange={(e) => handleFilterChange("flagStatus", e.target.value)}
                      />{" "}
                      Unflagged
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 my-4">
                {Object.keys(filters).map((category) => {
                  if (filters[category]) {
                    return (
                      <div key={category} className="flex items-center gap-2 bg-white border-gray-300 border px-2 py-1 rounded-lg">
                        <span>{`${filters[category]}`}</span>
                        <button onClick={() => clearFilter(category)} className="text-red-600 hover:text-red-800">
                          &times;
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="flex space-x-3 items-center justify-end">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="flex w-60 mr-6 relative border rounded-lg">
            <SearchIcon className="absolute left-2 top-2 h-6 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 w-full focus:outline-none ml-6"
            />

          </div>


        </div>
{}
        <Table rows={filteredAndSearchedRows} columns={currentConfig.columns} />
      </div>
    </div>
  );
};

export default UserManagementList;
