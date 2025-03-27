import { useQuery } from 'react-query';
import axios from 'axios';

const getDepartments = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/department/list`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.department
        } else {
            throw new Error('Failed to fetch departments ');
        }
    } catch (error) {
        console.log('Failed to fetch departments statistics', error);
    }
};

export const UseGetDepartments = () => {
    return useQuery('departments', () => getDepartments());
};
