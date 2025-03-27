import { useQuery } from 'react-query';
import axios from 'axios';

const getProfile = async (id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const url = id ? `https://phaseii-backend.amanahhr.com/api/getProfile/${id}` : `https://viiabackend.com/api/v1/admin/profile`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch Profile');
        }
    } catch (error) {
        console.log('Failed to fetch Profile', error);
        throw error; // Ensure error propagates to React Query's error handling
    }
};

export const UseGetProfile = (id) => {
    return useQuery(['profile', id], () => getProfile(id), {
        refetchOnWindowFocus: false,
        staleTime: Infinity, // Only fetch once unless manually invalidated
        cacheTime: Infinity,
    });
};
