import { httpClient } from "../config";

const login = (credentials) => {
  return httpClient
    .post(`/login`, credentials)
    .then((res) => res.data.data);
};

const getAll = () => {
  return httpClient
    .get(`/api/users`)
    .then((res) => res.data.data);
};

const loginService = {
  login,
  getAll,
};

export default loginService;
