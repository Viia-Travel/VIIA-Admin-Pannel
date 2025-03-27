import axios from "axios";
import { successToaster, errorToaster } from "../../utils/toaster";
import { useMutation, useQueryClient } from "react-query";

export default function useRequestLeave() {

    const queryClient = useQueryClient()

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        throw new Error('No authentication token found.');
    }

    const requestLeave = async (data) => {
        return await axios.post(`https://phaseii-backend.amanahhr.com/api/leave`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
    };

    return useMutation(requestLeave, {
        onSuccess: async (res, variables, context) => {
            successToaster("Leave Requested successfully!")
            queryClient.refetchQueries(["pendingLeaves"])
            queryClient.refetchQueries(["rejectedLeaves"])
            queryClient.refetchQueries(["leaveStats"])
            queryClient.refetchQueries(["allMemberLeaves"])
            queryClient.refetchQueries(["HRandManagerApprovalRequests"])
        },

        onError: (err, variables, context) => {
            let errorMessage = "Could not request a leave.";

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