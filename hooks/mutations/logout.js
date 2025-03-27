import axios from "axios";
import { useRouter } from "next/router";
import { successToaster, errorToaster } from "@/utils/toast";
import { useMutation, useQueryClient } from "react-query";

export default function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient()

    const logout = async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        return await axios.delete(
            
            `https://viiabackend.com/api/logout`,
          
            {
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${authToken}`
                },
            }
        );
    };

    return useMutation(logout, {
        onSuccess: async (res, variables, context) => {

            // localStorage.removeItem('authToken');
       
            localStorage.removeItem('user');
           
 
           
        },


        onError: (err) => {
            if (err.response.data.status_code == 403) {
                errorToaster(err.response.data.message)
            }
            else {
                let errorMessage = "Error logging in. ";

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
            }

        }
    })
}