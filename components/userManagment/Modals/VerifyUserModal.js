import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";
import ResendDocumentsForm from "./ResendDocuments";
import { Dialog, DialogTitle } from "@mui/material";
import { UseGetVerificationDocs } from "@/hooks/query/users/getVerificationdoc";
import useVerifyUser from "@/hooks/mutations/users/verifyUser";

const VerifyUserModal = ({ data, isOpen, onClose }) => {
  const [currentToggle, setCurrentToggle] = useState(0);
  const [selectedIdFile, setSelectedIdFile] = useState(null); // State for ID file
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null); // State for photo file

  const { data: VerificationDoc } = UseGetVerificationDocs(data.id)
  const userTypes = ["passenger", "driver"];

  const [showResendForm, setShowResendForm] = useState(false);
  const verifyUser = useVerifyUser()

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

  // Formik form validation schema using Yup
  const validationSchema = Yup.object().shape({
    selectedOption: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  // Formik form submit function
  const onSubmit = (values, { setSubmitting }) => {
    // verifyUser.mutate(
    //   {
    //     id: data.id,
    //     type: currentToggle == 0 ? 'passenger' : 'driver'
    //   }
    // )
    setSubmitting(false);
    onClose(); // Close modal after form submission
  };

  const submit=()=>{
    verifyUser.mutate(
      {
        id: data.id,
        type: currentToggle == 0 ? 'passenger' : 'driver'
      },
      {
        onSuccess:()=>{
          onClose(); 
        }
      }
    )
    
   
  }  // Initialize Formik form
  // const formik = useFormik({
  //   initialValues: {
  //     selectedOption: "",
  //     email: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: onSubmit,
  // });

  const handleCloseModal = () => {
    onClose();
    setShowResendForm(false); // Reset the form visibility state on close
  };

  const handleIdFileChange = (event) => {
    setSelectedIdFile(event.currentTarget.files[0]);
  };

  // Handle file selection for photo file
  const handlePhotoFileChange = (event) => {
    setSelectedPhotoFile(event.currentTarget.files[0]);
  };

  const handleRequestResend = () => {
    setShowResendForm(true);
  };


  // Function to handle downloading files
  const handleDownloadFile = (file) => {
    // Implement download logic here
    console.log(`Downloading file: ${file.name}`);
    // Example: You can open the file in a new tab for download
    window.open(file.url, "_blank");
  };

  return (
    <><Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" className="rounded-lg">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            {showResendForm ?
              'Resend Documents ' :
              ' Verify a user'}

          </h3>
          <button onClick={onClose}>
            <svg className="h-6 w-6 cursor-pointer text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </DialogTitle>

      <div className={`p-8 ${currentToggle == 1 ? 'h-[550px]' : ''} overflow-y-scroll`}>


        <div className="mb-6">
          {userTypes?.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentToggle(index)}
              className={`px-4 capitalize py-2 w-1/2 font-bold rounded-l ${currentToggle !== index
                ? "text-black bg-white"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
        {showResendForm ?
          <ResendDocumentsForm onClose={() => setShowResendForm(false)} />
          :
          <>
            {/* <form onSubmit={formik.handleSubmit}> */}
              <div className="grid grid-cols-2 gap-3 my-3">
                <div className="">
                  <label
                    htmlFor="selectedOption"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of the user
                  </label>
                  <input
                    type="text"
                    id="selectedOption"
                    name="selectedOption"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    value={data.name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email"
                  />

                </div>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    value={data.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email"
                  />

                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">
                  ID & Photo verification
                </p>
                <div className="grid grid-cols-2 gap-4 my-3 ">
                  <div className="flex  border border-gray-300 rounded-lg p-4">
                    <label
                      htmlFor="idFile"
                      className="text-sm text-gray-600 cursor-pointer"
                    >

                      <input
                        id="idFile"
                        name="idFile"
                        type="file"
                        readOnly
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      className="text-sm flex space-x-3 text-gray-500 cursor-pointer mt-1 items-center "
                      onClick={() => handleDownloadFile(selectedIdFile)}
                      disabled={!selectedIdFile}
                    >
                      Tech design requirements.pdf
                      {/* {selectedIdFile ? selectedIdFile.name : "  File"} */}
                      <DownloadIcon className="h-5 w-5 ml-3" />
                    </button>
                  </div>
                  <div className="flex  border border-gray-300 rounded-lg p-4">
                    <label
                      htmlFor="idFile"
                      className="text-sm text-gray-600 cursor-pointer"
                    >

                      <input
                        id="idFile"
                        name="idFile"
                        type="file"
                        readOnly
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      className="text-sm flex space-x-3 text-gray-500 cursor-pointer mt-1 items-center "
                      onClick={() => handleDownloadFile(selectedIdFile)}
                      disabled={!selectedIdFile}
                    >
                      Tech design requirements.pdf
                      {/* {selectedIdFile ? selectedIdFile.name : "  File"} */}
                      <DownloadIcon className="h-5 w-5 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
              {currentToggle === 1 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Car details (DVLA)
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(carDetails).map(([key, { label, value }]) => (
                      <div key={key} className="mb-4">
                        <p className="text-sm font-medium text-gray-700">
                          {label}
                        </p>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  className="text-sm font-semibold text-primary-500 hover:text-primary-600"
                  onClick={handleRequestResend}
                >
                  Request to resend documents
                </button>
                <div className="space-x-4">
                  <button
                    type="button"
                    className="text-sm text-white px-3 py-2 bg-red-500 rounded-md"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={()=>submit()}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                    // disabled={formik.isSubmitting}
                  >
                    Verify User
                  </button>
                </div>
              </div>
            {/* </form> */}
          </>
        }
      </div>

    </Dialog>

    </>
  );
};

export default VerifyUserModal;
