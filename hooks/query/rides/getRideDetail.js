import { useQuery } from 'react-query';
import axios from 'axios';

const RideDetail = async (id) => {
    try {
       
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
      
        const response = await axios.get(`https://viiabackend.com/api/v1/ride/${id}/show`, {

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

export const UseGetRideDetail = (id) => {
    return useQuery('rideDetail', () => RideDetail(id));
};
