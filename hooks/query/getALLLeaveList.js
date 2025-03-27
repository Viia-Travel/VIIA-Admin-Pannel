import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAllApprovedLeaves = async (  ) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
      
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/leave-request-list?status=all`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.leaves;
        } else {
            throw new Error('Failed to fetch all  leaves');
        }
    } catch (error) {
        console.log('Failed to fetch all   leaves', error);

    }
};

export const getAllLeaveList = () => {
    return useQuery('allLeaveList', () => fetchAllApprovedLeaves());
};