import { httpClient } from '../config';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = httpClient.get(baseUrl);
  return request.then(response => response.data.data);
};

const getOne = (id) => {
  const request = httpClient.get(`${baseUrl}/${id}`)
  return request.then(response => response.data.data)
}

const add = (details) => {
  return httpClient
    .post(baseUrl, details)
    .then((res) => res.data.data);
};

const addComment = (id, details) => {
  return httpClient
    .post(`${baseUrl}/${id}/comments`, details)
    .then(res => res.data.data)
}

const update = (id, newObj) => {
  return httpClient
    .put(`${baseUrl}/${id}`, newObj)
    .then((res) => res.data.data);
};

const remove = (id) => {
  return httpClient
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};

const blogService = { getAll, getOne, add, update, remove, addComment };

export default blogService;
