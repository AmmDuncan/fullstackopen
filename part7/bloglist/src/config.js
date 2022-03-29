import axios from 'axios';
import sessionData from "./utils/session-data";
import { setUser } from "./reducers/user";

const instance = axios.create({
  baseURL: 'http://localhost:3003'
})

instance.interceptors.request.use((config) => {
  const user = sessionData.getUser();
  if (!user) return config;

  config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      setUser('')
      window.location = '/login'
    }
    return Promise.reject(err)
  }
)

export const httpClient = instance
