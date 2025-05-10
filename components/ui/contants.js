import Tooltip from '@mui/material/Tooltip';
import UserCustomFilterMenu from '../userManagment/customeMenu';
import PaymentMenu from '../paymentSection/PaymentMenu';
import { FileCogIcon, StarIcon } from 'lucide-react';
import RatingMenu from '../ratings/ratingMenu';
import BookingCustomeMenu from '../bookings/bookingCustomMenu';
import { renderCheckbox } from 'react-data-grid';
import RideMenu from '../rideMonitering/rideMenu';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const getRatingLabel = (rating) => {
  if (rating >= 3) return { label: "Positive", color: "#63FD9A" }; // Green
  if (rating >= 2.5) return { label: "Neutral", color: "#FAC515" }; // Yellow
  return { label: "Negative", color: "#F97066" }; // Red
};

export const getPaymentLogo = (method) => {
  switch (method) {
    case 'Visa':
      return <img src={'/assets/visa.svg'} alt="Visa" className="inline-block w-9 h-9 mr-2" />;
    case 'GPay':
      return <img src={'/assets/google_pay.svg'} alt="Google Pay" className="inline-block w-9 h-9 mr-2" />;
    case 'Stripe':
      return <img src={'/assets/stripe.svg'} alt="Stripe" className="inline-block w-9 h-9 mr-2" />;
    case 'ApplePay':
      return <img src={'/assets/apple_pay.svg'} alt="Apple Pay" className="inline-block w-9 h-9 mr-2" />;
    case 'MasterCard':
      return <img src={'/assets/mastercard.svg'} alt="MasterCard" className="inline-block w-9 h-9 mr-2" />;
    case 'PayPal':
      return <img src={'/assets/paypal.svg'} alt="PayPal" className="inline-block w-9 h-9 mr-2" />;
    default:
      return null;
  }
};

export const allUsersColumns = [
  { field: "name", headerName: "Full name", flex: 1 },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    renderCell: (params) => {
      return (
        <Tooltip title={params.value} arrow classes={{ tooltip: 'custom-tooltip', arrow: 'custom-tooltip-arrow' }}>
          <p className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
            {params.value}
          </p>
        </Tooltip>
      );
    }
  },
  { field: "phone", headerName: "Phone number", flex: 1 },
  {
    field: "created_at",
    headerName: "Date Registered",
    flex: 1,
    renderCell: (params) => {
      const date = new Date(params.value);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  }
  ,
  {
    field: "gender",
    headerName: "Gender",
    flex: 1,
  },
  {
    field: "UserType",
    headerName: "User type",
    flex: 1,
  },
  // {
  //   field: "ActiveStatus",
  //   headerName: "Active Status",
  //   flex: 1,
  //   renderCell: (params) => (
  //     <div className="my-2 p-2 px-4 text-sm rounded-md"
  //       style={{
  //         backgroundColor: params.value === "Active" ? "#ECFDF3" : "#ECFDF3",
  //       }}
  //     >
  //       {params.value === "Active" ? "Active" : "Inactive"}
  //     </div>
  //   ),
  // },
  // {
  //   field: "RidesCount",
  //   headerName: "Rides count",
  //   flex: 1,
  // },
  // {
  //   field: "Flagged",
  //   headerName: "Flagged",
  //   flex: 1,
  //   renderCell: (params) => (
  //     <div>
  //       {params.value === "flag" ? (
  //         <img className="w-[22px] my-4" src="/assets/flag.svg" alt="Flagged" />
  //       ) : (
  //         params.value
  //       )}
  //     </div>
  //   ),
  // },
  {
    field: "VerificationStatus",
    headerName: "Verification Status",
    flex: 1.2,
    innerWidth: 330,
    renderCell: (params) => (
      <div
        className="my-2 p-2 px-4 text-sm rounded-md"
        style={{
          backgroundColor: params.value === "verified" ? "#ECFDF3" : "#ECFDF3",
        }}
      >
        {params.value === "verified" ? "Verified" : "Non Verified"}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const id = params.row.id;
      return (
        <div className="my-2 flex justify-end">
          <UserCustomFilterMenu userType={'all'} data={params.row} />
        </div>
      );
    },
  },
];

export const unVerifiedUserColumns = [
  { field: "FullName", headerName: "Full name", flex: 1 },
  {
    field: "Email",
    headerName: "Email",
    flex: 1,
    renderCell: (params) => {
      return (
        <Tooltip title={params.value} arrow classes={{ tooltip: 'custom-tooltip', arrow: 'custom-tooltip-arrow' }}>
          <p className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
            {params.value}
          </p>
        </Tooltip>
      );
    }
  },
  { field: "PhoneNumber", headerName: "Phone number", flex: 1 },
  {
    field: "DateRegistered",
    headerName: "Date registered",
    flex: 1,
  },
  {
    field: "RegDate",
    headerName: "Reg Date",
    flex: 1,
  },
  {
    field: "Gender",
    headerName: "gender",
    flex: 1,
  },
  {
    field: "UserType",
    headerName: "User Type",
    flex: 1,
  },
  {
    field: "VerificationStatus",
    headerName: "Verification Status",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 p-2 px-4 text-sm rounded-md"
        style={{
          backgroundColor: params.value === "Active" ? "#ECFDF3" : "#ECFDF3",
        }}
      >
        {params.value === "Active" ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <UserCustomFilterMenu userType={'unverified'} data={params.row} />
        </div>
      );
    },
  },
];

export const deactivatedUserColumns = [
  { field: "FullName", headerName: "Full name", flex: 1 },
  {
    field: "Email",
    headerName: "Email",
    flex: 1,
    renderCell: (params) => {
      return (
        <Tooltip title={params.value} arrow classes={{ tooltip: 'custom-tooltip', arrow: 'custom-tooltip-arrow' }}>
          <p className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
            {params.value}
          </p>
        </Tooltip>
      );
    }
  },
  {
    field: "UserType",
    headerName: "User Type",
    flex: 1,
  },
  {
    field: "DateRegistered",
    headerName: "Date registered",
    flex: 1,
  },
  {
    field: "DateDeactivated",
    headerName: "Date Deactivated",
    flex: 1,
  },
  {
    field: "Flagged",
    headerName: "Flagged",
    flex: 1,
    renderCell: (params) => (
      <div>
        {params.value === "flag" ? (
          <img className="w-[22px] my-4" src="/assets/flag.svg" alt="Flagged" />
        ) : (
          params.value
        )}
      </div>
    ),
  },
  {
    field: "ReasonForDeactivation",
    headerName: "Reason For Deactivation",
    flex: 2,
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <UserCustomFilterMenu userType={'deactivated'} data={params.row} />
        </div>
      );
    },
  },
];

export const flaggedUserColumns = [
  { field: "FullName", headerName: "Full name", flex: 1 },
  {
    field: "Email",
    headerName: "Email",
    flex: 1,
    renderCell: (params) => {
      return (
        <Tooltip title={params.value} arrow
          classes={{ tooltip: 'custom-tooltip', arrow: 'custom-tooltip-arrow' }}>
          <p className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
            {params.value}
          </p>
        </Tooltip>
      );
    }
  },
  {
    field: "UserType",
    headerName: "User Type",
    flex: 1,
  },
  {
    field: "DateFlagged",
    headerName: "Date Flagged",
    flex: 1,
  },
  {
    field: "ReasonForFlagging",
    headerName: "Reason For Flagging",
    flex: 1,
  },
  {
    field: "Flagged",
    headerName: "Flagged",
    flex: 1,
    renderCell: (params) => (
      <div>
        {params.value === "flag" ? (
          <img className="w-[22px] my-4" src="/assets/flag.svg" alt="Flagged" />
        ) : (
          params.value
        )}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <UserCustomFilterMenu userType={'flagged'} data={params.row} />
        </div>
      );
    },
  },
];

export const transactionOverviewColumns = [
  { field: "TripCodeID", headerName: "Trip Code ID", flex: 1 },
  { field: "Passenger", headerName: "Passenger", flex: 1 },
  { field: "Driver", headerName: "Driver", flex: 1 },
  { field: "Date", headerName: "Date", flex: 1 },
  { field: "Time", headerName: "Time", flex: 1 },
  {
    field: "PaymentMethod", headerName: "Payment Method", flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        {getPaymentLogo(params.value)}
        <span>{params.value}</span>
      </div>
    ),
  },
  { field: "Amount", headerName: "Amount", flex: 1 },
  {
    field: "Status", headerName: "Status", flex: 1,
    renderCell: (params) => (
      <div className="my-2  px-2 py-1  text-center text-sm rounded-full"
        style={{
          backgroundColor: params.value === "Successful" ? "#ECFDF3" : "#EFF8FF",
          color: params.value === "Successful" ? "#027A48" : "#175CD3",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <PaymentMenu userType={'transaction'} data={params.row} />
        </div>
      );
    },
  },
];
export const walletManagementColumns = [
  { field: "UserName", headerName: "Name of User", flex: 1 },
  { field: "Type", headerName: "Type", flex: 1 },
  {
    field: "Date", headerName: "Date", flex: 1,
    renderCell: (params) => (
      <div className="flex flex-col mt-2">

        <p className='text-sm'>{params.value}

        </p>
        <span className='text-xs'>{params.row?.Time}</span>
      </div>
    ),
  },
  { field: "Amount", headerName: "Amount", flex: 1 },
  { field: "Revenue", headerName: "Revenue", flex: 1 },
  {
    field: "PaymentMethod", headerName: "Payment Method", flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        {getPaymentLogo(params.value)}
        <span>{params.value}</span>
      </div>
    ),
  },
  {
    field: "Status", headerName: "Status", flex: 1,
    renderCell: (params) => (
      <div className="my-2 py-1  text-center text-sm rounded-full"
        style={{
          backgroundColor: params.value === "Successful" ? "#ECFDF3" : params.value === "Declined" ? "#FEF3F2" : "#EFF8FF",
          color: params.value === "Successful" ? "#027A48" : params.value === "Declined" ? "#B42318" : "#175CD3",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <PaymentMenu userType={'wallet'} data={params.row} />
        </div>
      );
    },
  },
];
export const paymentGatewayIntegrationColumns = [
  {
    field: "PaymentMethod", headerName: "Payment Method", flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        {getPaymentLogo(params.value)}
        <span>{params.value}</span>
      </div>
    ),
  },
  { field: "ConfigurationDetail", headerName: "Configuration Detail", flex: 3 },
  { field: "DateConnected", headerName: "Date Connected", flex: 2 },
  {
    field: "Status", headerName: "Status", flex: 1,
    renderCell: (params) => (
      <div className="my-2  py-1  text-center text-sm rounded-full"
        style={{
          backgroundColor: params.value === "Connected" ? "#ECFDF3" : "#FEF3F2",
          color: params.value === "Connected" ? "#027A48" : "#B42318",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {


    flex: 2,
    renderCell: (params) => (
      <div className="">

        <PaymentMenu userType={'PaymentGateway'} data={params.row} />

      </div>
    ),
  },
];
export const tripPaymentColumns = [
  { field: "TripCodeID", headerName: "Trip Code ID", flex: 1 },
  { field: "Date", headerName: "Date", flex: 1 },
  { field: "Time", headerName: "Time", flex: 1 },
  { field: "Amount", headerName: "Amount", flex: 1 },
  { field: "Revenue", headerName: "VIIA Revenue", flex: 1 },
  {
    field: "PaymentMethod", headerName: "Payment Method", flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        {getPaymentLogo(params.value)}
        <span>{params.value}</span>
      </div>
    ),
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <div
        className="my-2 px-2 py-1 text-center text-sm rounded-full"
        style={{
          backgroundColor: params.value === "Successful" ? "#ECFDF3" : params.value === "Declined" ? "#FEF3F2" : "#EFF8FF",
          color: params.value === "Successful" ? "#027A48" : params.value === "Declined" ? "#B42318" : "#175CD3",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <div className="my-2 flex justify-end">
          <PaymentMenu userType={'tripPayment'} data={params.row} />
        </div>
      );
    },
  },
];
export const allRatingColumns = [
  { field: "tripCodeID", headerName: "Trip code ID", flex: 1 },
  {
    field: "Date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: 'Sender',
    headerName: "Sender",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className='flex flex-col text-xs my-2'>
          <p className='text-sm'>
            {params.value}
          </p>
          <p>
            Passenger
          </p>

        </div>
      )
    }
  },

  {
    field: 'Receiver',
    headerName: "Receiver",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className='flex flex-col text-xs my-2'>
          <p className='text-sm'>
            {params.value}
          </p>
          <p>
            Driver
          </p>

        </div>
      )
    }
  },
  {
    field: "Rating",
    headerName: "Rating",
    flex: 1,
    renderCell: (params) => {
      const rating = parseFloat(params.value);
      const { label, color } = getRatingLabel(rating);

      return (
        <div className="flex flex-col mt-2">

          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className="w-4 h-4"
                style={{
                  color: star <= rating ? color : "#D1D5DB", // Fill or gray
                  fill: star <= rating ? color : "#D1D5DB",
                }}
              />
            ))}
          </div>
          {/* Label */}
          <span
            className=" text-sm font-medium mt-1"
            style={{ color }}
          >
            {label}
          </span>
        </div>
      );
    },
  },

  {
    field: "Comment",
    headerName: "Comment",
    flex: 2,
  },
  {

    renderCell: (params) => {

      return (
        <div className='my-2 flex justify-end'>
          <RatingMenu userType={'rating'} data={params.row} />
          {/* <RatingsFilterMenu id={id} /> */}
        </div>
      );
    },
  },
]
export const allReportColumns = [
  { field: "tripCodeID", headerName: "Trip code ID", flex: 1 },
  {
    field: "Date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "Reporter",
    headerName: "Reporter",
    flex: 1,
  },
  {
    field: "User",
    headerName: "Reported User",
    flex: 1,
  },

  {
    field: "Details",
    headerName: "Report Details",
    flex: 2,
  },

  {
    field: "file",
    headerName: "Attach files",
    flex: 1,
    renderCell: (params) => {
      const id = params.row.id;

      return (
        <div className='rounded-full h-12 w-12 p-3 bg-[#F0FFF5]'>
          <FileCogIcon className='text-green-400' />
        </div>
      );
    },
  },
  {
    renderCell: (params) => {
      return (
        <div className='my-2 flex justify-end'>
          <RatingMenu userType={'report'} data={params.row} />
        </div>
      );
    },
  },
]
export const allTicketsColumn = [
  { field: "user_name", headerName: "Name of User", flex: 1 },
  {
    field: "ticket_id",
    headerName: "Ticket ID",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date & Time",
    flex: 1,
    renderCell: (params) => {


      return (
        <div className='rounded-full h-12 w-12 p-3 flex flex-col text-xs'>
          <p className='text-sm'>{params.value}</p>
          <p>
            {params.row.time}
          </p>
        </div>
      );
    },
  },
  {
    field: "issue_category",
    headerName: "Issue Category",
    flex: 1,
  },

  {
    field: "description",
    headerName: "Issue Description",
    flex: 2,
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {


      return (

        <div
          className="mt-4 px-1  w-20 text-center text-sm rounded-full"
          style={{
            color: params.value === "Resolved" ? "#027A48" : params.value === "Pending" ? "#344054" : "#175CD3",
            backgroundColor: params.value === "Resolved" ? "#ECFDF3" : params.value === "Pending" ? "#F2F4F7" : "#EFF8FF",
          }}
        >
          {params.value}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {


      return (

        <Link href={`/support/${params.row.id}`}>
          <ChatBubbleLeftEllipsisIcon className='text-blue-500 h-8 w-7 mt-2  cursor-pointer' />
        </Link>
      );
    },
  },

]

export const allBookingsColumn = [
  {
    field: "driver_name",
    headerName: "Name of Driver",
    flex: 1,
    renderCell: (params) => {
      const driverName =
        params.row.ride_type === "published"
          ? `${params.row.driver?.fname || ""} ${params.row.driver?.lname || ""}`
          : "—";
      return <div>{driverName}</div>;
    },
  },
  {
    field: "passenger_name",
    headerName: "Name of Passenger",
    flex: 2,
    renderCell: (params) => {
      const passengerName =
        params.row.ride_type === "requested"
          ? `${params.row.requester?.fname || ""} ${params.row.requester?.lname || ""}`
          : `${params.row.passengers?.[0]?.user?.fname || ""} ${params.row.passengers?.[0]?.user?.lname || ""}`;
      return <div>{passengerName}</div>;
    },
  },

  {
    field: "pickup",
    headerName: "Pickup Point",
    flex: 4,
  },
  {
    field: "destination",
    headerName: "Destination",
    flex: 4,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 2,
  },
  {
    field: "time",
    headerName: "Time",
    flex: 2,
  },
  {
    field: "car_space",
    headerName: "Seats",
    flex: 1,
    renderCell: (params) => {
      return <div className='font-semibold'>{params.value ?? "—"}</div>;
    },
  },
  {
    field: "cost",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => {
      return <div className='font-semibold'>£{params.value}</div>;
    },
  },
  {
    flex: 1,
    renderCell: (params) => {
      return (
        <div className='m-2 flex justify-end'>
          <BookingCustomeMenu data={params.row} userType={'Booking'} />
        </div>
      );
    },
  },
];


export const requestedRidesColumn = [
  {
    field: "passenger_name",
    headerName: "Name of Passenger",
    flex: 1,
    renderCell: (params) => {
      const passengerName = `${params.row.requester?.fname || ""} ${params.row.requester?.lname || ""}`;
      return <div>{passengerName}</div>;
    },
  },
  { field: "pickup", headerName: "Pickup Point", flex: 3 },
  { field: "destination", headerName: "Destination", flex: 3 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  {
    field: "cost",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => (
      <div className="font-semibold">{params.value}</div>
    ),
  },
  {
    field: "actions",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 flex justify-end w-full">
        <BookingCustomeMenu data={params.row} userType="Requested" />
      </div>
    ),
  },
];


export const publishedRidesColumn = [
  {
    field: "driver_name",
    headerName: "Name of Driver",
    flex: 1,
    renderCell: (params) => {
      const driverName = `${params.row.driver?.fname || ""} ${params.row.driver?.lname || ""}`;
      return <div>{driverName}</div>;
    },
  },
  { field: "pickup", headerName: "Pickup Point", flex: 2 },
  { field: "destination", headerName: "Destination", flex: 2 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  {
    field: "car_space",
    headerName: "Seats",
    flex: 1,
    renderCell: (params) => (
      <div className="font-semibold">{params.value}</div>
    ),
  },
  {
    field: "cost",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => (
      <div className="font-semibold">{params.value}</div>
    ),
  },
  {
    field: "actions",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 flex justify-end w-full">
        <BookingCustomeMenu data={params.row} userType="Published" />
      </div>
    ),
  },
];

export const deletedBookingsColumn = [
  { field: "driver_name", headerName: "Name of Driver", flex: 1 },
  { field: "passengers", headerName: "Passengers", flex: 2 },
  { field: "pickup_point", headerName: "Pickup Point", flex: 1 },
  { field: "destination", headerName: "Destination", flex: 1 },
  {
    field: "deleted_date",
    headerName: "Deleted Date",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className='rounded-full h-12 w-12 p-3 flex flex-col text-xs'>
          <p className='text-sm'>{params.value}</p>
        </div>
      );
    },
  },
  { field: "reason", headerName: "Reason", flex: 2 },
  {
    field: "view",
    headerName: "View",
    flex: 1,
    renderCell: (params) => {
      return (
        <BookingCustomeMenu data={params.row} userType={'Deleted'} />
      );
    },
  },
];


export const onGoingTripColumns = [
  {
    field: "id",
    headerName: "Trip ID",
    flex: 1
  },
  {
    field: "driver",
    headerName: "Driver",
    flex: 3,
    renderCell: (params) => (
      
     
      <div className="flex items-center">
       
        {params.value?.avatar && (
          <img
            src={params.value.avatar == 'https://viiabackend.com/storage/profile/no-image.png' ? '/assets/image.png' : params.value.avatar}
            alt="driver"
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span>{params.value ? `${params.value.fname} ${params.value.lname}` : 'N/A'}</span>
      </div>
    
    ),
  },
  {
    field: "passengers",
    headerName: "Passengers",
    flex: 4,
    renderCell: (params) => {

      if (!params.value || !Array.isArray(params.value)) {
        return <div>No passengers</div>;
      }

      return (
        <div className="flex items-center space-x-2  mt-1 ml-2">
          {params.value.length > 0 ? (
            <>
              {params.value.slice(0, 3).map((passenger) => (
                <div key={passenger.id} className="flex items-center group relative">
                  <img
                    src={passenger.user?.avatar == 'https://viiabackend.com/storage/profile/no-image.png' ? '/assets/image.png' : passenger.user?.avatar}
                    alt={`${passenger.user?.fname} ${passenger.user?.lname}`}
                    className="w-8  h-8 rounded-full object-cover border border-gray-200"

                  />

                  {passenger.ride_status === 'ended' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  )}
                </div>
              ))}
              {params.value.length > 3 && (
                <span className="text-sm text-gray-500">
                  +{params.value.length - 3} more
                </span>
              )}
            </>
          ) : 'No passengers'}
        </div>
      );
    },
  },
  {
    field: "pickup",
    headerName: "Pickup Location",
    flex: 4,
  },
  {
    field: "destination",
    headerName: "Destination",
    flex: 4,
  },
  {
    field: "time",
    headerName: "Time",
    flex: 2,
    renderCell: (params) => (
      <div>
        <div>{params.row.time}</div>

      </div>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    flex: 2,
    renderCell: (params) => (
      <div>
        <div>{params.row.date}</div>

      </div>
    ),
  },
  {
    field: "available_space",
    headerName: "Available Seats",
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        <span className="text-gray-500">{params.value}</span>
      </div>
    ),
  },
  {
    field: "cost",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => (
      <div className="font-semibold">
        £{params.value}
      </div>
    ),
  },
  {
    field: "ride_type",
    headerName: "Type",
    flex: 2,
    renderCell: (params) => (
      <div className={`px-1 py-1 mt-2 text-center rounded-full text-sm ${params.value === 'published'
        ? 'bg-blue-100 text-blue-600'
        : 'bg-purple-100 text-purple-600'
        }`}>
        {params.value === 'published' ? 'Published' : 'Requested'}
      </div>
    ),
  },
  {
    flex: 1,
    renderCell: (params) => {
      return (
        <div className='my-2 flex justify-end'>
          <RideMenu userType={'ongoing'} data={params.row} />
        </div>
      );
    },
  },
];

export const completedTripColumns = [
  {
    field: "id",
    headerName: "Trip ID",
    flex: 1
  },
  {
    field: "driver",
    headerName: "Driver",
    flex: 2,
    renderCell: (params) => (
      <div className="flex items-center">
        {params.value?.avatar && (
          <img
          src={params.value.avatar == 'https://viiabackend.com/storage/profile/no-image.png' ? '/assets/image.png' : params.value.avatar}
          alt="driver"
          className="w-8 h-8 rounded-full mr-2"
        />
        )}
        <span>{params.value ? `${params.value.fname} ${params.value.lname}` : 'N/A'}</span>
      </div>
    ),
  },
  {
    field: "passengers",
    headerName: "Passengers",
    flex: 4,
    renderCell: (params) => {
      if (!params.value || !Array.isArray(params.value)) {
        return <div>No passengers</div>;
      }

      return (
        <div className="flex items-center space-x-2 ml-2 mt-1">
          {params.value.length > 0 ? (
            <>
              {params.value.slice(0, 3).map((passenger) => (
                <div key={passenger.id} className="flex items-center group relative">
                  <img
                    src={passenger.user.avatar == 'https://viiabackend.com/storage/profile/no-image.png' ? '/assets/image.png' : passenger.user.avatar}
                    alt={`${passenger.user?.fname} ${passenger.user?.lname}`}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"

                  />
                 
                  {passenger.ride_status === 'ended' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  )}
                </div>
              ))}
              {params.value.length > 3 && (
                <span className="text-sm text-gray-500">
                  +{params.value.length - 3} more
                </span>
              )}
            </>
          ) : 'No passengers'}
        </div>
      );
    },
  },
  {
    field: "pickup",
    headerName: "Pickup Location",
    flex: 2,
  },
  {
    field: "destination",
    headerName: "Destination",
    flex: 2,
  },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    renderCell: (params) => (
      <div>
        <div>{params.row.date}</div>
        <div className="text-sm text-gray-500">{params.value}</div>
      </div>
    ),
  },
  {
    field: "available_space",
    headerName: "Available Seats",
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        <span className="text-gray-500">{params.value}</span>
      </div>
    ),
  },
  {
    field: "cost",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => (
      <div className="font-semibold">
        £{params.value}
      </div>
    ),
  },
  {
    field: "ride_type",
    headerName: "Type",
    flex: 1.5,
    renderCell: (params) => (
      <div className={`px-3 py-1 mt-2 rounded-full text-sm ${params.value === 'published'
        ? 'bg-blue-100 text-blue-600'
        : 'bg-purple-100 text-purple-600'
        }`}>
        {params.value === 'published' ? 'Published' : 'Requested'}
      </div>
    ),
  },
  {
    renderCell: (params) => {
      return (
        <div className='my-2 flex justify-end'>
          <RideMenu userType={'complete'} data={params.row} />
        </div>
      );
    },
  },
];


