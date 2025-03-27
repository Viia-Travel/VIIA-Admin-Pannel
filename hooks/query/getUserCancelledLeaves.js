import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCancelledLeaves = async (id) => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error('No authentication token found.');
    }

    const url = id && `https://phaseii-backend.amanahhr.com/api/cancelled-leaves/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data.Cancelled_leaves;
    } else {
      throw new Error('Failed to fetch cancelled leaves');
    }
  } catch (error) {
    console.log('Failed to fetch cancelled leaves', error);

  }
};

export const useCancelledLeaves = (id) => {
  return useQuery('cancelledLeaves', () => fetchCancelledLeaves(id));
};
