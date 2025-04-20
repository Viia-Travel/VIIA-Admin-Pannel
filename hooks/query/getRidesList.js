import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAllRides = async ( id ) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
       
        const response = await axios.get(`https://viiabackend.com/api/v1/admin/ride/all`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch all rides ');
        }
    } catch (error) {
        console.log('Failed to fetch all rides', error);

    }
};

export const UseGetAllRidesList = () => {
    return useQuery('Rides', () => fetchAllRides());
};