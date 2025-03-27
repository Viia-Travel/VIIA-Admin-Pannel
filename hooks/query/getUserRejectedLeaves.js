import { useQuery } from 'react-query';
import axios from 'axios';

const fetchRejectedLeaves = async (id) => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error('No authentication token found.');
    }

    const url = id && `https://phaseii-backend.amanahhr.com/api/rejected-leaves/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data.Rejected_leaves;
    } else {
      throw new Error('Failed to fetch rejected leaves');
    }
  } catch (error) {
    console.log('Failed to fetch rejected leaves', error);

  }
};

export const useRejectedLeaves = (id) => {
  return useQuery('rejectedLeaves', () => fetchRejectedLeaves(id));
};
