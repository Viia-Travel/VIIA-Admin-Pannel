import { useQuery } from 'react-query';
import axios from 'axios';

const getCompanyHandbooks = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/company/handbooks`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.handbooks
        } else {
            throw new Error('Failed to fetch company handbooks.');
        }
    } catch (error) {
        console.log('Failed to fetch company handbooks.', error);
    }
};

export const UseGetCompanyHandbooks = () => {
    return useQuery('companyHandbooks', () => getCompanyHandbooks());
};
