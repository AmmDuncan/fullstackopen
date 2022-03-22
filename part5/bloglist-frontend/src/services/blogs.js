import axios from 'axios';
import sessionData from '../utils/session-data';

const baseUrl = '/api/blogs';
axios.interceptors.request.use((config) => {
  const user = sessionData.getUser();
  if (!user) return config;

  config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data.data);
};

const add = (details) => {
  return axios
    .post(baseUrl, details)
    .then((res) => res.data.data);
};

const update = (id, newObj) => {
  return axios
    .put(`${baseUrl}/${id}`, newObj)
    .then((res) => res.data.data);
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};

const blogService = { getAll, add, update, remove };

export default blogService;
