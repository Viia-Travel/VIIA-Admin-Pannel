import { useQuery } from 'react-query';
import axios from 'axios';

const getStaffUserById = async (id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(
            `https://phaseii-backend.amanahhr.com/api/admin/user/show/${id}`, 
            {
                
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

        if (response.status === 200) {
            return response.data.response;
        } else {
            throw new Error('Failed to fetch staff user');
        }
    } catch (error) {
        console.log('Failed to fetch staff user', error);
    }
};

export const UseGetStaffUserById = (id) => {
    return useQuery(['staffUserById', id], () => getStaffUserById(id));
};
  