import { useQuery } from 'react-query';
import axios from 'axios';

const attendanceReport = async (start, end) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        // Pass start and end as query parameters using params
        const response = await axios.get('https://phaseii-backend.amanahhr.com/api/monthly-report', {
            params: {
                start_date: start,
                end_date: end,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.Monthly_Report;
        } else {
            throw new Error('Failed to fetch monthly report');
        }
    } catch (error) {
        console.log('Failed to fetch monthly report', error);
        throw error; // Ensure error propagates to React Query
    }
};


export const GetTeamAttendanceReport = (start, end) => {
    return useQuery(['attendanceReport', start, end], () => attendanceReport(start, end)
)
};
