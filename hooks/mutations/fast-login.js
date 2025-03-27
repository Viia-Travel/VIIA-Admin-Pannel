import axios from "axios";
import { useRouter } from "next/router";
import { errorToaster } from "../../utils/toaster";
import { useMutation, useQueryClient } from "react-query";

export default function useFastLogin() {
    const queryClient = useQueryClient()

    const login = async (data) => {
        return await axios.post(
            `https://phaseii-backend.amanahhr.com/api/employee/details`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    };

    return useMutation(login, {
        onSuccess: async (res, variables, context) => {
            queryClient.refetchQueries('FastLogin');
        },

        onError: (err) => {
            let errorMessage = "Error in fast login. ";

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
    })
}