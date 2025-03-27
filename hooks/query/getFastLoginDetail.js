import { useQuery } from 'react-query';
import axios from 'axios';

const getLoginDetails = async (employee_id) => {
    try {

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/employee/details`,
            {
                params: {
                    employee_id: employee_id
                }
            });

        if (response.status === 200) {
            return response.data.response;
        } else {
            throw new Error('Failed to get Employee Data');
        }
    } catch (error) {
        console.log('Failed to get Employee Data', error);

    }
};

export const useGetFastLoginDetails = (employee_id) => {
    return useQuery(['FastLogin', employee_id], () => getLoginDetails(employee_id), {
        refetchOnWindowFocus: false,
        cacheTime: 0, // Ensure no caching
        staleTime: 0, // Ensure the data is always fresh
    });
};
