import axios from 'axios';
const baseUrl = '/login';

const login = (credentials) => {
  return axios
    .post(baseUrl, credentials)
    .then((res) => res.data.data);
};

const loginService = {
  login
};

export default loginService;
