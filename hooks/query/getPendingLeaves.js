import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPendingLeaves = async (id) => {
    try {
       
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
        const url = id ? `https://phaseii-backend.amanahhr.com/api/allPendingLeaves/${id}` : `https://phaseii-backend.amanahhr.com/api/allPendingLeaves`
        const response = await axios.get(url, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.data.pending_leaves;
        } else {
            throw new Error('Failed to fetch pending leaves');
        }
    } catch (error) {
        console.log('Failed to fetch pending leaves', error);

    }
};

export const usePendingLeaves = (id) => {
    return useQuery('pendingLeaves', () => fetchPendingLeaves(id));
};
