import { useQuery } from 'react-query';
import axios from 'axios';

const getPositions = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/position/list`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.positions
        } else {
            throw new Error('Failed to fetch positions ');
        }
    } catch (error) {
        console.log('Failed to fetch position statistics', error);

    }
};

export const UseGetPositions = () => {
    return useQuery('positions', () => getPositions());
};
