import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPendingLeaves = async (id) => {
    try {
       
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
      
        const response = await axios.get(`https://viiabackend.com/api/v1/user/${id}/profile`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch profile ');
        }
    } catch (error) {
        console.log('Failed to fetch profile', error);

    }
};

export const UseGetProfile = (id) => {
    return useQuery('profile', () => fetchPendingLeaves(id));
};
