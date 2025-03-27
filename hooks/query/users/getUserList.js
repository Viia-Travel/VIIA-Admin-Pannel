import { useQuery } from 'react-query';
import axios from 'axios';

const getUserList = async (id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }


        const response = await axios.get(`https://viiabackend.com/api/v1/admin/users`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch user');
        }
    } catch (error) {
        console.log('Failed to fetch fetch user', error);
    }
};

export const UseGetUserList = () => {
    return useQuery('User', () => getUserList())

};
