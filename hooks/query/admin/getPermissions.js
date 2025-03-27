import { useQuery } from 'react-query';
import axios from 'axios';

const getPermissions = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/getPermissions`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.permissions
        } else {
            throw new Error('Failed to fetch roles ');
        }
    } catch (error) {
        console.log('Failed to fetch roles list.', error);
    }
};

export const UseGetPermissions = () => {
    return useQuery('permissions', () => getPermissions());
};
