import { useQuery } from 'react-query';
import axios from 'axios';

const getAdminLocationSettings = async (id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/location/show-location-settings/${id}`, {

            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data.response
        } else {
            throw new Error('Failed to Location Settings .');
        }
    } catch (error) {
        console.log('Failed to Location Settings.', error);
    }
};
export const UseGetAdminLocationSetting = (id, enabled) => {
    return useQuery(['LocationSettings', id], () => getAdminLocationSettings(id), {
        enabled, // Query is disabled until explicitly enabled
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        staleTime: 0, // Avoid stale data
        cacheTime: 0, // Don't cache the data
    });
};