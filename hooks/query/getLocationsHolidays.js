import { useQuery } from 'react-query';
import axios from 'axios';

const getLocationsHolidays = async (date) => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error('No authentication token found.');
    }

    const response = await axios.get(`https://phaseii-backend.amanahhr.com/api/admin/location/public-holidays`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          date: date
        }
      });

    if (response.status === 200) {
      return response.data.response;
    } else {
      throw new Error('Failed to fetch locations holidays.');
    }
  } catch (error) {
    console.log('Failed to fetch locations holidays.', error);
  }
};

export const UseGetLocationsHolidays = () => {
  return useQuery('locationHolidays', () => getLocationsHolidays());
};
