import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAllApprovedLeaves = async ( id ) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        
        const url = id?.id ? `https://phaseii-backend.amanahhr.com/api/allApprovedLeaves/${id.id}` : `https://phaseii-backend.amanahhr.com/api/allApprovedLeaves`
        const response = await axios.get(url, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response.data.approved_leaves;
        } else {
            throw new Error('Failed to fetch all approved leaves');
        }
    } catch (error) {
        console.log('Failed to fetch all approved  leaves', error);

    }
};

export const useAllApprovedLeaves = (id) => {
    return useQuery('allApprovedLeaves', () => fetchAllApprovedLeaves(id));
};