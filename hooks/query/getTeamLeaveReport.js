import { useQuery } from 'react-query';
import axios from 'axios';

const getLeaveSummary = async (start, end) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        throw new Error('No authentication token found.');
    }
  
    const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/export-users-leaves`, {
        params: {
            start_date: start,
            end_date: end,
        },
        headers: {
            Authorization: `Bearer ${authToken}`,
        },

    });

    if (response.status === 200) {

        return response.data.users_leaves_report;
    } else {
        throw new Error('Failed to fetch user leave.');
    }
};

export const useExportLeaveSummary = (start, end) => {
    return useQuery(['leaveSummary', start, end], () => getLeaveSummary(start, end), {
        enabled: !!start && !!end, // Enable query only if start and end dates are provided
    });

};
