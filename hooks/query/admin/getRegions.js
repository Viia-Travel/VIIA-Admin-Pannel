import { useQuery } from 'react-query';
import axios from 'axios';

const getRegions = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/regions`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.regions
        } else {
            throw new Error('Failed to fetch region ');
        }
    } catch (error) {
        console.log('Failed to fetch region statistics', error);

    }
};

export const UseGetRegions = () => {
    return useQuery('region', () => getRegions());
};
