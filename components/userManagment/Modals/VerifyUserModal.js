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
  
    const driverDoc = VerificationDoc?.find(doc => doc.for === "driver");
    const vehicle = driverDoc?.vehicle;
  
    const carDetails = {
      vehicleNumber: {
        label: "Vehicle Number",
        value: vehicle?.vehicle_number || "-",
      },
      fuelType: {
        label: "Fuel Type",
        value: vehicle?.fuelType || "-",
      },
      motStatus: {
        label: "MOT Status",
        value: vehicle?.motStatus || "-",
      },
      colour: {
        label: "Colour",
        value: vehicle?.colour || "-",
      },
      make: {
        label: "Make",
        value: vehicle?.make || "-",
      },
      yearOfManufacture: {
        label: "Year of Manufacture",
        value: vehicle?.yearOfManufacture || "-",
      },
      taxStatus: {
        label: "Tax Status",
        value: vehicle?.taxStatus || "-",
      },
      monthOfFirstRegistration: {
        label: "First Registered",
        value: vehicle?.monthOfFirstRegistration || "-",
      },
    };
  
  


  const submit = () => {
    verifyUser.mutate(
      {
        id: data.id,
        type: currentToggle == 0 ? 'passenger' : 'driver'
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    )


  }
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
              <p className="text-sm font-medium text-gray-700 mb-2">
                ID & Photo Verification
              </p>

              <div className="grid grid-cols-2 gap-4">
                {VerificationDoc?.map((doc) => {
                  if ((currentToggle === 0 && doc.for === "passenger") || (currentToggle === 1 && doc.for === "driver")) {
                    return (
                      <React.Fragment key={doc.id}>
                        {/* Passport */}
                        {doc.passport && (
                          <div className="border rounded-lg p-2">
                            <p className="text-xs font-semibold mb-1">Passport</p>
                            <img src={doc.passport} alt="Passport" className="w-full h-40 object-contain rounded" />
                            <p className="text-xs text-gray-500 mt-1">Verified: {doc.passport_verified ? "Yes" : "No"}</p>
                          </div>
                        )}

                        {/* Face Photo */}
                        {doc.face && (
                          <div className="border rounded-lg p-2">
                            <p className="text-xs font-semibold mb-1">Face Photo</p>
                            <img src={doc.face} alt="Face" className="w-full h-40 object-contain rounded" />
                            <p className="text-xs text-gray-500 mt-1">Verified: {doc.face_verified ? "Yes" : "No"}</p>
                          </div>
                        )}

                        {/* License - only for driver */}
                        {currentToggle === 1 && doc.license && (
                          <>
                            {doc.license.front && (
                              <div className="border rounded-lg p-2">
                                <p className="text-xs font-semibold mb-1">License Front</p>
                                <img src={doc.license.front} alt="License Front" className="w-full h-40 object-contain rounded" />
                              </div>
                            )}
                            {doc.license.back && (
                              <div className="border rounded-lg p-2">
                                <p className="text-xs font-semibold mb-1">License Back</p>
                                <img src={doc.license.back} alt="License Back" className="w-full h-40 object-contain rounded" />
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-1">License Verified: {doc.license_verified ? "Yes" : "No"}</p>
                          </>
                        )}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
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
                      <p className="text-sm font-medium text-gray-700">{label}</p>
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
                  onClick={() => submit()}
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
