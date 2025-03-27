import { useQuery } from 'react-query';

const getUser = () => {
  const userObject = localStorage.getItem('user');
  const user = userObject ? JSON.parse(userObject) : null;
  return user;
};

const useGetActiveUser = () => {
  return useQuery('activeUser', getUser);
};

export default useGetActiveUser;
