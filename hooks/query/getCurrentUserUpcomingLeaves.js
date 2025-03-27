import { useQuery } from 'react-query';
import axios from 'axios';

const currentUserUpcomingLeaves = async (id) => {
  
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        const url = id ? `https://phaseii-backend.amanahhr.com/api/upcoming-leaves/${id}` : `https://phaseii-backend.amanahhr.com/api/upcoming-leaves`
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.leaves;
        } else {
            throw new Error('Failed to fetch upcoming leaves');
        }
    } catch (error) {
        console.log('Failed to fetch upcoming leaves', error);

    }
};

export const UseCurrentUserUpcomingLeaves = (id) => {
    return useQuery('currentUpcomingLeaves', ()=>currentUserUpcomingLeaves(id));
};
