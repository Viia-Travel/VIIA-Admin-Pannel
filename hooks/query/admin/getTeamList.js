import { useQuery } from 'react-query';
import axios from 'axios';

const getTeams = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }
       
        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/team/list`, {
           
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
       
            return response.data.teams
        } else {
            throw new Error('Failed to fetch team ');
        }
    } catch (error) {
        console.log('Failed to fetch team list.', error);
    }
};

export const UseGetTeams = () => {
    return useQuery('teams', () => getTeams());
};
