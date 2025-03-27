import { useQuery } from 'react-query';
import axios from 'axios';

const getLeaveTrends = async ({id}) => {
 
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
        const url = id ? `https://phaseii-backend.amanahhr.com/api/leaveTrends/${id}` : `https://phaseii-backend.amanahhr.com/api/leaveTrends`
        const response = await axios.get(url, {
           
        headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch Leave Trends');
        }
    } catch (error) {
        console.log('Failed to fetch Leave Trends', error);
        
    }
};

export const useLeaveTrends = (id) => {
  return useQuery('leaveTrends', ()=>getLeaveTrends(id));
};
