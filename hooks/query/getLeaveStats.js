import { useQuery } from 'react-query';
import axios from 'axios';

const getLeaveStats = async (userID) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const url = userID ? `https://phaseii-backend.amanahhr.com/api/getLeavesStats/${userID}` : `https://phaseii-backend.amanahhr.com/api/getLeavesStats`
        const response = await axios.get(url, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.data;
        } else {
            throw new Error('Failed to fetch Leave Stats');
        }
    } catch (error) {
        console.log('Failed to fetch Leave Stats', error);
    }
};

export const useLeaveStats = (userID) => {
    return useQuery('leaveStats', () => getLeaveStats(userID));
};
