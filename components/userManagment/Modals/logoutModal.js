import { successToaster } from "@/utils/toast";
import React from "react";
import { AlertTitle, Dialog, DialogTitle } from "@mui/material";
import { AlertTriangle, InfoIcon } from "lucide-react";
import { useRouter } from "next/router";
import useLogout from "@/hooks/mutations/logout";

const LogoutModal = ({ isOpen, onClose }) => {
    // Formik form validation schema using Yup
    const logout = useLogout()
    const router = useRouter()
   
    const HanleLogout = () => {
        logout.mutate( {
            onSuccess: (res) => {
                
                onClose();
                successToaster("Logout Successfully");
                  localStorage.removeItem('authToken');
       
                router.push('/');
            },
            onError: (err) => {
                console.error("Error:", err); 
            }
        });
    };
    
    const handleCloseModal = () => {
        onClose(); // Call the onClose function passed from parent to close the modal
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs" className="rounded-lg">
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Logout</h3>
                        <button onClick={onClose}>
                            <svg className="h-6 w-6 cursor-pointer text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </DialogTitle>

                <div className="p-4">
                    <div className="flex justify-center -mt-4 mb-3">
                        <div className="rounded-full bg-red-100 p-1.5">
                            <div className="rounded-full bg-red-200 p-1.5">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                        </div>
                    </div>
                    <div className="px-3 flex flex-col justify-center items-center my-4">
                        <h3 className="text-lg text-red-700 text-center font-semibold leading-6">
                            Logout Confirmation
                        </h3>
                        <p className="text-center text-sm mt-2">
                            Are you sure you want to log out ?


                            <br />
                            Click
                            click on <span className="font-semibold"> Yes</span> to confirm or <span className="font-semibold"> Cancel </span> to stay logged in.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <button
                            type="button"
                            className="text-sm text-gray-700 px-3 py-2 bg-white border border-gray-300 rounded-md"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={HanleLogout}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"

                        >
                            Yes , Logout
                        </button>
                    </div>

                </div>

            </Dialog>

        </>
    );
};

export default LogoutModal;
