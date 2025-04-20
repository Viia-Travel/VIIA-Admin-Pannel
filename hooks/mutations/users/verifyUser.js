import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { successToaster , errorToaster } from "@/utils/toast";


export default function useVerifyUser() {
    const queryClient = useQueryClient();
    
    const cancelLeave = async ({ id, type }) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        return await axios.patch(
            `https://viiabackend.com/api/v1/admin/users/${id}/${type}/verification`,
                {
                    "verify":1
                }

            ,
          
            {
                headers: {

                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
    };

    return useMutation(cancelLeave, {
        onSuccess: async (res, variables, context) => {
           
            queryClient.refetchQueries(["UserVerifyDoc"])
            queryClient.refetchQueries(["User"])
            successToaster("User Verified Successfully!")
        },
        onError: (err, variables, context) => {
            let errorMessage = "Error in Verified User. ";

            const errorData = err.response?.data;

            if (Array.isArray(errorData)) {
                // Handle case when response data is an array of errors
                errorData.forEach(error => {
                    errorMessage += `\n${error.field}: ${error.message}`;
                });
            } else if (errorData?.errors) {
                // Handle case when errors are in an object with keys
                Object.keys(errorData.errors).forEach(key => {
                    errorMessage += `\n${key}: ${errorData.errors[key]}`;
                });
            } else if (errorData?.message) {
                // Handle case when there is a single error message
                errorMessage += `\nMessage: ${errorData.message}`;
            } else {
                // Handle unexpected cases where no clear error format exists
                errorMessage += "\nAn unknown error occurred.";
            }

            errorToaster(errorMessage);
        },
    });
}