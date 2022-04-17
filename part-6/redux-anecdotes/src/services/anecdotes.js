import axios from 'axios';
const baseUrl = '/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, { content: anecdote, votes: 0 });
  return response.data;
};
const services = {
  getAll,
  create,
};
export default services;
