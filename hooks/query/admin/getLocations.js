import { useQuery } from 'react-query';
import axios from 'axios';

const getLocations = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/location/list`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {

            return response.data.locations
        } else {
            throw new Error('Failed to fetch locations ');
        }
    } catch (error) {
        console.log('Failed to fetch locations list.', error);
    }
};

export const UseGetLocations = () => {
    return useQuery('locations', () => getLocations());
};
