import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { errorToaster } from "../../../utils/toaster";

export default function UseSetCurrentCompanyHandbook() {
    const queryClient = useQueryClient();

    const currentCompanyHandbook = async (id) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        return await axios.post(
            `https://phaseii-backend.amanahhr.com/api/admin/company/handbooks/${id}/set-current`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
    };

    return useMutation(currentCompanyHandbook, {
        onSuccess: async (res, variables, context) => {
            queryClient.refetchQueries(['companyHandbooks']);
        },
        onError: (err) => {
            let errorMessage = "Error in Setting Handbook";

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
