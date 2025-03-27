import axios from "axios";
import { useRouter } from "next/router";
import { successToaster, errorToaster } from "@/utils/toast";
import { useMutation, useQueryClient } from "react-query";

export default function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient()

    const login = async (data) => {
        return await axios.post(
            `https://viiabackend.com/api/login-admin`,
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
            localStorage.setItem('authToken', res.data.data.token);
            const data = {
                id: res.data.data.id,
                name: res.data.data.fname + res.data.data.lname,
                email: res.data.data.email,
               
                avatar: res.data.data.avatar,
               
            }

            localStorage.setItem('user', JSON.stringify(data));
            queryClient.refetchQueries(["profile"])
            queryClient.refetchQueries('activeUser');
 
            successToaster("Login Successful")
            router.push(`/dashboard`)
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