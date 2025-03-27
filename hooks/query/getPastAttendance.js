import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPastAttendance = async (id, start, end) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const url =  start && end ? `https://phaseii-backend.amanahhr.com/api/getPastAttendence/${id}?start_date=${start}&end_date=${end}` : `https://phaseii-backend.amanahhr.com/api/getPastAttendence/${id}`


        const response = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
               
            }
              
             

        );

    if (response.status === 200) {
        return response.data.response.past_attendence;
    } else {
        throw new Error('Failed to fetch past attendances');
    }
} catch (error) {
    console.log('Failed to fetch past attendances', error);

}
};

export const usePastAttendance = (id, start, end) => {
    return useQuery('pastAttendance', () => fetchPastAttendance(id, start, end));
};
