import axios from "axios";
import { successToaster, errorToaster } from "../../utils/toaster";
import { useMutation } from "react-query";

export default function UseClockedIn() {

  const clockedIn = async (data) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error('No authentication token found.');
    }

    return await axios.post(
      `https://phaseii-backend.amanahhr.com/api/clockIn`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );


  };

  return useMutation(clockedIn, {
    onSuccess: async (res, variables, context) => {
      successToaster("Clocked In Successfully")
      localStorage.setItem('clockId', res.data.response.clockIn.id);

    },

    onError: (err, variables, context) => {
      if (err.response.data.status_code == 404) {
        errorToaster("Error" + err.response.data.message)
      }
      else {
        let errorMessage = "Error in clocking in! ";

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