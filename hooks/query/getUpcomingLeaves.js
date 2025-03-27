import { useQuery } from 'react-query';
import axios from 'axios';

const allUpcomingLeaves = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/get-members-upcoming-leaves`, {
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

export const UseAllUpcomingLeaves = () => {
  return useQuery('upcomingLeaves', allUpcomingLeaves);
};
