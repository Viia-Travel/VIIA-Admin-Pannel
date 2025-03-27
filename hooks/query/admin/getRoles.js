import { useQuery } from 'react-query';
import axios from 'axios';

const getRoles = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/getRoles`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.roles
        } else {
            throw new Error('Failed to fetch roles ');
        }
    } catch (error) {
        console.log('Failed to fetch roles list.', error);
    }
};

export const UseGetRoles = () => {
    return useQuery('roles', () => getRoles());
};
