import { useQuery } from 'react-query';
import axios from 'axios';

const getAttendance = async (date) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }


        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/attendence/list`,
            {

                headers: {

                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    date: date
                }
            });

        if (response.status === 200) {
            return response.data.attendance
        } else {
            throw new Error('Failed to fetch attendance.');
        }
    } catch (error) {
        console.log('Failed to fetch attendance statistics.', error);

    }
};

export const UseGetAdminAttendance = (date) => {
    return useQuery('AdminAttendance', () => getAttendance(date));
};
