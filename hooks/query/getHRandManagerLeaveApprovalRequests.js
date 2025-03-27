import { useQuery } from 'react-query';
import axios from 'axios';

const fetchHRandManagerLeaveApprovalRequests = async (leaveStatus) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(
            `https://phaseii-backend.amanahhr.com/api/leave-approval-requests`, 
            {
                params: {
                    status: leaveStatus
                },
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

        if (response.status === 200) {
            return response.data.leaves;
        } else {
            throw new Error('Failed to fetch approval requests.');
        }
    } catch (error) {
        console.log('Failed to fetch approval requests.', error);
    }
};

export const UseHRandManagerLeaveApprovalRequests = (leaveStatus) => {
    return useQuery(['HRandManagerApprovalRequests', leaveStatus], () => fetchHRandManagerLeaveApprovalRequests(leaveStatus));
};