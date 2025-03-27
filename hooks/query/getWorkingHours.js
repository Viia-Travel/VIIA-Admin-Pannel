import { useQuery } from 'react-query';
import axios from 'axios';

const getWorkingHours = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(
            `https://phaseii-backend.amanahhr.com/api/hr/working-hours/trends`, 
            {
               
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

        if (response.status === 200) {
            return response.data.working_hours;
        } else {
            throw new Error('Failed to fetch Working Hours ');
        }
    } catch (error) {
        console.log('Failed to fetch Working Hours', error);
    }
};

export const UseGetWokingHours = (leaveStatus) => {
    return useQuery(['workingHours', leaveStatus], () => getWorkingHours(leaveStatus));
};
  