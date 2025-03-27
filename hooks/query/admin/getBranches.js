import { useQuery } from 'react-query';
import axios from 'axios';

const getAttendance = async (date) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }


        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/branches`,
            {

                headers: {

                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    date: date
                }
            });

        if (response.status === 200) {
            return response.data.branches
        } else {
            throw new Error('Failed to fetch brances.');
        }
    } catch (error) {
        console.log('Failed to fetch brances statistics.', error);

    }
};

export const UseGetBranchList = () => {
    return useQuery('branch', () => getAttendance());
};
