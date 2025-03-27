import { useQuery } from 'react-query';
import axios from 'axios';

const getAttendanceStats = async (id,month) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        const url = id ? `https://phaseii-backend.amanahhr.com/api/get-attendence-statistics/${id}/${month}` : `https://phaseii-backend.amanahhr.com/api/get-attendence-statistics/${month}`
        const response = await axios.get(url, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response;
        } else {
            throw new Error('Failed to fetch attendence statistics');
        }
    } catch (error) {
        console.log('Failed to fetch attendence statistics', error);

    }
};

export const useAttendanceStats = (id,month) => {
    return useQuery('attendanceStats', () => getAttendanceStats(id,month));
};
