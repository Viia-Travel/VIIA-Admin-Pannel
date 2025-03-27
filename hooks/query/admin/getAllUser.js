import { useQuery } from 'react-query';
import axios from 'axios';

const getAllUsers = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/all-user/list`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
          
            return response.data.users
        } else {
            throw new Error('Failed to fetch users ');
        }
    } catch (error) {
        console.log('Failed to fetch users statistics', error);

    }
};

export const UseGetAllUsers = () => {
    return useQuery('Allusers', () => getAllUsers());
};
