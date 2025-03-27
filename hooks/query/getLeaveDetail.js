import { useQuery } from 'react-query';
import axios from 'axios';

const getLeaveDetail = async (id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/leave-details/${id}`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.leave_details;
        } else {
            throw new Error('Failed to fetch Leave Detail');
        }
    } catch (error) {
        console.log('Failed to fetch Leave Detail', error);
    }
};

export const UseGetLeaveDetail = (id) => {
    return useQuery(['leaveDetail', id], () => getLeaveDetail(id), {
        refetchOnWindowFocus: false,
        cacheTime: 0, // Ensure no caching
        staleTime: 0, // Ensure the data is always fresh
    });
   
};
