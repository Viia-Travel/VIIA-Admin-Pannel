import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { errorToaster, successToaster } from "../../utils/toaster";

export default function UseUpdateLeaveOnBehalfOf() {
    const queryClient = useQueryClient();

    const updateOnBehalfOf = async ({ id, formData }) => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        return await axios.post(
            `https://phaseii-backend.amanahhr.com/api/leave-requests/onbehalfstatus/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
    };

    return useMutation(updateOnBehalfOf, {
        onSuccess: async () => {
            successToaster("Leave Approved By HR Successfully");
            queryClient.refetchQueries(["leaveDetail"]);
            queryClient.refetchQueries(["pendingLeaves"]);
            queryClient.refetchQueries(["rejectedLeaves"])
            queryClient.refetchQueries(["allApprovedLeaves"]);
            queryClient.refetchQueries(["leaveTrends"]);
            queryClient.refetchQueries(["leaveStats"]);
            queryClient.refetchQueries(["allMemberLeaves"]);
            queryClient.refetchQueries(["individualMemberLeave"]);
            queryClient.refetchQueries(["memberDetail"]);

            
            queryClient.refetchQueries(["HRandManagerApprovalRequests"]);
        },
        onError: (err, variables, context) => {
            let errorMessage = "Error in updating leave status. ";

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