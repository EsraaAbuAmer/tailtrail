import axiosClient from './axiosClient';

export const testApi = async () => {
  const res = await axiosClient.get('/pets');
  return res.data.pets;
};
