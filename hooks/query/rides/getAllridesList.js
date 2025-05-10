import { useQuery } from 'react-query';
import axios from 'axios';

const AllRides = async (status) => {
    try {
       
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
      
        const response = await axios.get(`https://viiabackend.com/api/v1/admin/ride/all?page=1&limit=100&ride_type=${status}`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch rides ');
        }
    } catch (error) {
        console.log('Failed to fetch rides', error);

    }
};

export const UseGetAllRides = (status) => {
    return useQuery('allRides', () => AllRides(status), {
        retry: 1,
        refetchOnWindowFocus: false
    });
};
